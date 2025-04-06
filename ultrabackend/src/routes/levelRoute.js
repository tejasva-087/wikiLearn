const express = require("express");

const levelController = require("../controllers/levelController");

const router = express.Router();

router
  .route("/")
  .get(levelController.getAllLevels)
  .post(levelController.createLevel);

module.exports = router;
