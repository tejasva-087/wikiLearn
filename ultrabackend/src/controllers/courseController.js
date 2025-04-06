const catchAsync = require("../utils/catchAsync");
const Course = require("../models/courseModel");

exports.getAllCourses = catchAsync(async (req, res, next) => {
  const course = await Course.find();
  // const course = await Course.find().populate("badges").populate("levels");

  res.status(200).json({
    status: "success",
    results: course.length,
    data: {
      course,
    },
  });
});

exports.createCourse = catchAsync(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(200).json({
    status: "success",
    results: course.length,
    data: {
      course,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("level");

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});
