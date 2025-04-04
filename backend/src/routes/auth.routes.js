const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
  }
);

router.post(
  '/signin',
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // If everything ok, send token to client
    const token = generateToken(user);
    res.status(200).json({ token });
  })
);

// Sign-up route
router.post(
  '/signup',
  catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(newUser);
    res.status(201).json({ token });
  })
);

// Get current user route
router.get(
  '/me',
  verifyToken,
  catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  })
);

module.exports = router;
