require("dotenv").config({ path: `${__dirname}/config.env` });

// HANDLING THE UNCAUGHT EXCEPTION ERRORS (SYNCHRONOUS ERRORS)
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

const mongoose = require("mongoose");
const app = require("./app");

// DATABASE CONNECTIVITY
const dbString =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_DEV.replace("<DATABASE>", process.env.DATABASE_NAME)
    : process.env.DATABASE_PROD.replace(
        "<DATABASE>",
        process.env.DATABASE_NAME,
      ).replace("<PASSWORD>", process.env.PASSWORD);

mongoose.connect(dbString).then(() => {
  console.log("DB CONNECTED");
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// HANDLING UNHANDLED REJECTION ERRORS (ASYNCHRONOUS ERRORS)
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
