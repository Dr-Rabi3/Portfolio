const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Uncomment the line below for stack trace in development
    // stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
