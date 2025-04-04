const express = require("express");

const router = express.Router();

const courseController = require("../controllers/courseController");

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router.route("/:id").patch(courseController.updateCourse);

module.exports = router;
