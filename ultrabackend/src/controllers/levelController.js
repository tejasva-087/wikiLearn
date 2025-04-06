const catchAsync = require("../utils/catchAsync");
const Level = require("../models/levelModel");

exports.getAllLevels = catchAsync(async (req, res, next) => {
  const course = await Level.find();

  res.status(200).json({
    status: "success",
    results: course.length,
    data: {
      course,
    },
  });
});

exports.createLevel = catchAsync(async (req, res, next) => {
  const course = await Level.create(req.body);

  res.status(200).json({
    status: "success",
    results: course.length,
    data: {
      course,
    },
  });
});
