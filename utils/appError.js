//This class is only for operational Errors

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    //Set status based on statusCode!
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //So we can create an if/else statement later to tell if this error is our AppError
    //Class. If it is, isOperational will equal true
    this.isOperational = true;

    //This prevents the constructor from begin included in the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
