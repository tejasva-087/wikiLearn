const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    minLength: [3, 'Name must be atleast 3 characters'],
    maxLength: [20, 'Nmae must not be more then 20 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A user must have an email'],
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'The given email is not a valid email'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    minLength: [8, 'The given email is not a valid email'],
    validate: {
      validator: function (confirmPassword) {
        return this.password === confirmPassword;
      },
      message: 'Please enter the same passwords!',
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hashing the password before saving the password if the user is created or password is modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// updating the password modified time stamp if user changes the password
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordUpdatedAt = Date.now() - 1000;
  next();
});

// INSTANCE METHODS

// Compare the password with the hashed password
userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);

// Check if the user has changed the password after the jwt token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordUpdatedAt) {
    const changedTimestamp = Number.parseInt(this.passwordUpdatedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// Create a password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
