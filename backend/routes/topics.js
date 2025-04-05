const express = require('express');

const router = express.Router();
const Topic = require('../models/Topic');
const Subtopic = require('../models/Subtopic');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/topics/:id
// @desc    Get topic by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate('course');

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/topics/:id/subtopics
// @desc    Get all subtopics for a topic
// @access  Public
router.get('/:id/subtopics', async (req, res) => {
  try {
    const subtopics = await Subtopic.find({ topic: req.params.id }).sort({ order: 1 });
    res.json(subtopics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes for creating/updating topics
// @route   POST /api/topics
// @desc    Create a new topic
// @access  Admin only
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin (you'll need to implement this)

    const { title, description, course, order } = req.body;

    const newTopic = new Topic({
      title,
      description,
      course,
      order,
    });

    const topic = await newTopic.save();
    res.status(201).json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
