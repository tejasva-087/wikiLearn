const express = require('express');

const router = express.Router();
const Subtopic = require('../models/Subtopic');
const Quiz = require('../models/Quiz');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/subtopics/:id
// @desc    Get subtopic by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const subtopic = await Subtopic.findById(req.params.id).populate('topic');

    if (!subtopic) {
      return res.status(404).json({ message: 'Subtopic not found' });
    }

    res.json(subtopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/subtopics/:id/quiz
// @desc    Get quiz for a subtopic
// @access  Public
router.get('/:id/quiz', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ subtopic: req.params.id });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const clientQuiz = {
      _id: quiz._id,
      subtopic: quiz.subtopic,
      questions: quiz.questions.map(q => ({
        _id: q._id,
        question: q.question,
        options: q.options.map(opt => ({
          text: opt.text,
        })),
      })),
    };

    res.json(clientQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes for creating/updating subtopics
// @route   POST /api/subtopics
// @desc    Create a new subtopic
// @access  Admin only
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, topic, order, pointsAvailable } = req.body;

    const newSubtopic = new Subtopic({
      title,
      content,
      topic,
      order,
      pointsAvailable: pointsAvailable || 4,
    });

    const subtopic = await newSubtopic.save();
    res.status(201).json(subtopic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
