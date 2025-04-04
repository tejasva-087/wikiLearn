const express = require('express');
const { signup, login, resetPassword, forgotPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotpassword', forgotPassword);
router.patch('/resetpassword/:token', resetPassword);

module.exports = router;
