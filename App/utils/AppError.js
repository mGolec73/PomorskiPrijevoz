<<<<<<< HEAD
class AppError extends Error {
   constructor(message, statusCode, status) {
       super(message);
       this.statusCode = statusCode;
       this.status = status;
       this.isOperational = true;

       Error.captureStackTrace(this, this.constructor);
   }
}

=======
class AppError extends Error {
   constructor(message, statusCode, status) {
       super(message);
       this.statusCode = statusCode;
       this.status = status;
       this.isOperational = true;

       Error.captureStackTrace(this, this.constructor);
   }
}

>>>>>>> 0e827af1772040da18d0698719caf833f9af65e3
module.exports = AppError