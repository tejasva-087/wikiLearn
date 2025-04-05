const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const errorLogger = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${err.stack || err.message}\n`;

  console.error(logMessage);

  fs.appendFile(path.join(logsDir, 'error.log'), logMessage, appendErr => {
    if (appendErr) console.error('Error writing to log file:', appendErr);
  });

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${req.method} ${req.originalUrl}\n`;

  fs.appendFile(path.join(logsDir, 'requests.log'), logMessage, appendErr => {
    if (appendErr) console.error('Error writing to log file:', appendErr);
  });

  next();
};

module.exports = { errorLogger, requestLogger };
