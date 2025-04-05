const express = require('express');

const router = express.Router();
const Course = require('../models/Course');
const Topic = require('../models/Topic');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ order: 1 });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:id/topics
// @desc    Get all topics for a course
// @access  Public
router.get('/:id/topics', async (req, res) => {
  try {
    const topics = await Topic.find({ course: req.params.id }).sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes for creating/updating courses
// @route   POST /api/courses
// @desc    Create a new course
// @access  Admin only
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin (you'll need to implement this)

    const { title, description, imageUrl, order } = req.body;

    const newCourse = new Course({
      title,
      description,
      imageUrl,
      order,
    });

    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
