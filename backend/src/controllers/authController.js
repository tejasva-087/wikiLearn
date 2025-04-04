const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const oauthConfig = require('../config/oauth.config');

console.log('Google OAuth Config:', {
  clientID: oauthConfig.google.clientID,
  clientSecret: oauthConfig.google.clientSecret ? '****' : undefined
});

if (!oauthConfig.google.clientID || !oauthConfig.google.clientSecret) {
  console.warn('WARNING: Google OAuth credentials are not properly configured!');
}

exports.signup = async (req, res) => {
  try {
    const { email, password, name, surname } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      email,
      password,
      name,
      surname,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};
