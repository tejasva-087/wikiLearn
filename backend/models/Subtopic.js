const mongoose = require('mongoose');

const SubtopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  pointsAvailable: {
    type: Number,
    default: 4,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subtopic', SubtopicSchema);
