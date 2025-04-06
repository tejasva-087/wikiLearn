const express = require("express");

const { fivePiller } = require("../controllers/quizController");

const router = express.Router();

router.route("/fivepiller").get(fivePiller);

module.exports = router;
