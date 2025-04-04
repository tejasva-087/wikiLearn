const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const AppError = require("./utils/AppError");
const GlobalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRouter");
const chatBotRouter = require("./routes/chatBotRouter");

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : process.env.FRONTEND_URL,
    credentials: true,
  })
);

// MORGAN MIDDLEWARE FOR DEVELOPMENT
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// REQUEST BODY PARSER
app.use(express.json({ limit: "10kb" }));

// API ROUTES
app.use("/api/v1/users", userRouter);
appluse("/api/v1/chatbot", chatBotRouter);

// HANDLING UNHANDLED ROUTES
app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(GlobalErrorHandler);

module.exports = app;
