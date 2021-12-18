import ErrorHandler from "../utils/ErrorHandler";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  let error = { ...err };
  error.message = err.message;

  //cast eror
  if (err.name === "CastError") {
    const message = `Room Not Found. Invalid ${err.path} : ${err.value}`;
    error = new ErrorHandler(message, 400);
  }
  //valiadation error
  if (err.name === "ValidatorError") {
    const message = Object.values(err.error).map((v) => v.message);
    error = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,

    message: error.message,
    stack: err.stack,
  });
};
