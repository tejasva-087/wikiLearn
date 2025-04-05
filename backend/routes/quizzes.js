const express = require('express');

const router = express.Router();
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const Subtopic = require('../models/Subtopic');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/quizzes/submit/:id
// @desc    Submit quiz answers and get results
// @access  Private
router.post('/submit/:id', authMiddleware, async (req, res) => {
  try {
    const quizId = req.params.id;
    const { answers } = req.body;

    // Get the quiz with correct answers
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Get the subtopic
    const subtopic = await Subtopic.findById(quiz.subtopic);

    if (!subtopic) {
      return res.status(404).json({ message: 'Subtopic not found' });
    }

    // Check if user has already completed this subtopic
    const user = await User.findById(req.user.id);
    const progressIndex = user.progress.findIndex(
      p => p.subtopic.toString() === subtopic._id.toString()
    );

    if (progressIndex !== -1 && user.progress[progressIndex].completed) {
      return res.status(400).json({
        message: 'You have already completed this subtopic',
        progress: user.progress[progressIndex],
      });
    }

    // Check answers
    let correctCount = 0;
    const results = quiz.questions.map((question, index) => {
      const userAnswerIndex = answers[index];
      const isCorrect = userAnswerIndex === question.correctAnswer;
      if (isCorrect) correctCount += 1;

      return {
        question: question.question,
        userAnswer: userAnswerIndex,
        correctAnswer: question.correctAnswer,
        isCorrect,
        // Include feedback for the selected option if incorrect
        feedback: !isCorrect ? question.options[userAnswerIndex].feedback : null,
        // Include the general explanation for the correct answer
        explanation: question.explanation,
      };
    });

    // Calculate points (all correct = full points, otherwise 0)
    const allCorrect = correctCount === quiz.questions.length;
    const pointsEarned = allCorrect ? subtopic.pointsAvailable : 0;

    // Update user progress
    if (progressIndex === -1) {
      // Add new progress entry
      user.progress.push({
        subtopic: subtopic._id,
        completed: allCorrect,
        pointsEarned,
        completedAt: allCorrect ? Date.now() : null,
      });
    } else {
      // Update existing progress entry
      user.progress[progressIndex].completed = allCorrect;
      user.progress[progressIndex].pointsEarned = pointsEarned;
      user.progress[progressIndex].completedAt = allCorrect ? Date.now() : null;
    }

    // Update total points
    if (allCorrect) {
      user.totalPoints += pointsEarned;
    }

    await user.save();

    res.json({
      success: true,
      results,
      allCorrect,
      pointsEarned,
      totalPoints: user.totalPoints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes for creating/updating quizzes
// @route   POST /api/quizzes
// @desc    Create a new quiz
// @access  Admin only
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is admin (you'll need to implement this)

    const { subtopic, questions } = req.body;

    // Check if quiz already exists for this subtopic
    const existingQuiz = await Quiz.findOne({ subtopic });

    if (existingQuiz) {
      return res.status(400).json({ message: 'Quiz already exists for this subtopic' });
    }

    const newQuiz = new Quiz({
      subtopic,
      questions,
    });

    const quiz = await newQuiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
