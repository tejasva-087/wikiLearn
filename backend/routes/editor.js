const express = require('express');
const { checkArticle } = require('../controllers/editor-controller');

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Chatbot route is working' });
});

router.route('/checkarticle').post(checkArticle);

module.exports = router;
