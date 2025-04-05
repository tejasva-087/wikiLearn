const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  subtopic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subtopic',
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
          feedback: {
            type: String,
            required: true,
          },
        },
      ],
      correctAnswer: {
        type: Number,
        required: true,
      },
      explanation: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);
