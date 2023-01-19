const AppError = require('./../util/appError');

const handelCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,

      message: err.message,
    });
    //Programming error
  } else {
    res.status(500).json({
      status: err.status,
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // if (process.env.NODE_ENV === 'development') {
  sendErrorDev(err, res);
  // } else if (process.env.NODE_ENV === 'production') {
  //   let error = { ...err };

  //   if (err.name === 'CastError') error = handelCastErrorDB(error);
  //   if (error.code === 11000) error = handleDuplicateFieldsDB(err);
  //   if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
  //   if (err.name === 'JsonWebTokenError') error = handelJWTError();
  //   if (err.name === 'TokenExpiredError') error = handelJWTExpiredError();

  //   sendErrorProd(error, res);
  // }
};
