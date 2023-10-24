// class ApiError extends Error {
//   constructor(statusCode, message, stack = '', success = false) {
//     super(message);
//     this.statusCode = statusCode;
//     this.message = message;
//     this.success = success;
//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }

//   sendResponse(res) {
//     res.status(this.statusCode).json({
//       statusCode: this.statusCode,
//       success: this.success,
//       message: this.message,
//     });
//   }
// }

// module.exports = ApiError;

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  sendResponse(res) {
    return res.status(this.statusCode).json({ success: false, message: this.message });
  }
}

module.exports = ApiError;
