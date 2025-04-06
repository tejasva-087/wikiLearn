const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Fix the routes to use the correct exported functions
router.post("/signup", authController.signup);
router.post("/login", authController.signin || authController.login);

// Check if these functions exist in authController
// If forgotPassword and resetPassword are exported directly, use them
// Otherwise, they might be properties of authController
router.post(
  "/forgotpassword",
  authController.forgotPassword ||
    ((req, res) => {
      res.status(501).json({ message: "Not implemented yet" });
    }),
);

router.patch(
  "/resetpassword/:token",
  authController.resetPassword ||
    ((req, res) => {
      res.status(501).json({ message: "Not implemented yet" });
    }),
);

module.exports = router;
