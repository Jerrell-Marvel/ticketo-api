import { StatusCodes } from "http-status-codes";
export const errorHandler = (err, req, res, next) => {
  console.log(JSON.stringify(err));
  //   console.log("here");
  let customError = {
    success: false,
    name: err.name || "Internal server error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };

  if (err.name === "ValidationError" || err.name === "CastError" || err.name === "MulterError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code === 11000) {
    customError.statusCode = StatusCodes.CONFLICT;
    customError.name = "DuplicateValueError";
  }

  //   if (err.errors) {
  //     customError.fields = Object.keys(err.errors);
  //   }

  // return res.json(err);
  // next(err);
  return res.status(customError.statusCode).json(customError);
};
