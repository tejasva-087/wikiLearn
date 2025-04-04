const { promisify } = require('node:util');
const JWT = require('jsonwebtoken');
const crypto = require('node:crypto');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');

// CREATING THE JWT TOKEN
const signToken = async (id) =>
  await JWT.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// SIGNUP FUNCTION
exports.signup = catchAsync(async (req, res, _next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = await signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// LOGIN FUNCTION
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide a valid email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

// PROTECTING THE ROUTES
exports.protect = catchAsync(async (req, _res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged in, please login to get access', 401));
  }

  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);

  const currentuser = await User.findById(decoded.id);
  if (!currentuser) {
    return next(new AppError('The user belonging to the token no longer exists', 401));
  }

  if (currentuser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed the password! please log in again.', 401));
  }

  req.user = currentuser;

  next();
});

// RESTRICTING THE ROUTES (WILL BE BASED ON CERTAIN USER ROLES)
// so here just checking if the user has a role  or not
exports.restrictTo =
  (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action!', 403));
    }

    next();
  };

// FORGOT PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with this email address', 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/user/resetpassword/${resetToken}`;
  const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to ${resetUrl}\n if you didnt forget your password, please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Forgot your password? Submit a patch request',
      message,
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later'), 500);
  }

  res.status(200).json({
    status: 'success',
    message: 'Token send to email',
  });
});

// RESET PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log(hashedToken);

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('The token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;

  await user.save();

  const token = await JWT.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '90d' }
  );

  res.status(200).json({
    ststus: 'success',
    token,
  });
});
