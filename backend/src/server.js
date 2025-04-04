require('dotenv').config({ path: `${__dirname}/config.env` });

// HANDELING THE UNCAUGHT EXCEPTION ERRORS (SYNCHRONOUS ERRORS)
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

const mongoose = require('mongoose');
const app = require('./app');

// DATABASE CONNECTIVUTY
const dbString =
  process.env.NODE_ENV === 'development'
    ? process.env.DATABASE_DEV.replace('<DATABASE>', process.env.DATABASE_NAME)
    : process.env.DATABASE_PROD.replace('<DATABASE>', process.env.DATABASE_NAME).replace(
        '<PASSWORD>',
        process.env.PASSWORD
      );

mongoose.connect(dbString).then(() => {
  console.log('DB CONNECTED');
});

// STARTING THE SERVER
const port = process.env.PORT;
const server = app.listen(port, (_req, _res) => {
  console.log(`Server started at port ${port}`);
});

// HANDELING THE UNHANDLED REJECTION ERRORS (ASYNCHRONOUS ERRORS)
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
