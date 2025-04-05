const express = require('express');

const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const Subtopic = require('../models/Subtopic');

// @route   GET /api/progress
// @desc    Get user's learning progress
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate({
        path: 'progress.subtopic',
        select: 'title topic pointsAvailable',
        populate: {
          path: 'topic',
          select: 'title course',
          populate: {
            path: 'course',
            select: 'title',
          },
        },
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      totalPoints: user.totalPoints,
      progress: user.progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/next
// @desc    Get user's next recommended content
// @access  Private
router.get('/next', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('progress');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get completed subtopics
    const completedSubtopics = user.progress
      .filter(p => p.completed)
      .map(p => p.subtopic.toString());

    // Find the next uncompleted subtopic
    const nextSubtopic = await Subtopic.findOne({
      _id: { $nin: completedSubtopics },
    })
      .sort({ order: 1 })
      .populate({
        path: 'topic',
        select: 'title course',
        populate: {
          path: 'course',
          select: 'title',
        },
      });

    if (!nextSubtopic) {
      return res.json({
        message: 'Congratulations! You have completed all available content.',
        completed: true,
      });
    }

    res.json({
      nextSubtopic,
      completed: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
