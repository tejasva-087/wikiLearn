const express = require("express");
const { fivePillers } = require("../controllers/chatBotController");

const router = express.Router();

router.route("/fivepillers").post(fivePillers);

module.exports = router;
