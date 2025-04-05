const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
  progress: [
    {
      subtopic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtopic',
      },
      completed: {
        type: Boolean,
        default: false,
      },
      pointsEarned: {
        type: Number,
        default: 0,
      },
      completedAt: {
        type: Date,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
