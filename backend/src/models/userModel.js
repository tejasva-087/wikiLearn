const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  surname: String,
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    select: false,
  },
  googleId: String,
  githubId: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check if password is correct
userSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
