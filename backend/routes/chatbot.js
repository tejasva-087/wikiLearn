const express = require('express');
const { fivePillers } = require('../controllers/chatbot-controller');

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Chatbot route is working' });
});

router.route('/fivepillers').post(fivePillers);

module.exports = router;
