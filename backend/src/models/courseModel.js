const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  scoredPoints: {
    type: Number,
    default: 0,
  },
  level: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
