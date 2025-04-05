const AppError = require('../utils/app-error');

const handelCaseErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handelDuplicateFieldsDB = err => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
  return new AppError(message, 400);
};

const handelValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handelJWTError = () => new AppError('Invalid token please login again!', 401);

const handelJWTExpireError = () => new AppError('Invalid token please login again!', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);

    if (error.name === 'CastError') {
      error = handelCaseErrorDB(error);
    }

    if (error.code === 11000) {
      error = handelDuplicateFieldsDB(error);
    }

    if (error.name === 'ValidationError') {
      error = handelValidationErrorDB(error);
    }

    if (error.name === 'JsonWebTokenError') {
      error = handelJWTError();
    }

    if (error.name === 'TokenExpiredError') {
      error = handelJWTExpireError();
    }

    sendErrorProd(error, res);
  }
};
