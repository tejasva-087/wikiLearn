const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorLogger, requestLogger } = require('./middleware/errorHandler');
const GlobalErrorHandler = require('./controllers/error-controller');

dotenv.config({ path: './config.env' });

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/subtopics', require('./routes/subtopics'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/chat', require('./routes/chatbot'));
app.use('/api/editor', require('./routes/editor'));

app.get('/', (req, res) => {
  res.send('Wikimedia Learning API is running');
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(errorLogger);
app.use(GlobalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);

  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] UNHANDLED REJECTION: ${err.stack || err.message}\n`;

  // eslint-disable-next-line global-require
  require('fs').appendFile(require('path').join(__dirname, 'logs', 'error.log'), logMessage, () => {
    process.exit(1);
  });
});
