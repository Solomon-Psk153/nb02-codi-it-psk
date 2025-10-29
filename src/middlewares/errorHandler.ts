import { ErrorRequestHandler } from "express";
import { BadRequestError, ConflictError, ForbiddenError, LockedError, NotFoundError, UnauthorizedError } from "@_errors/400.error";
import { InternalServerError, NotImplementedError, ServiceUnavailableError } from "@_errors/500.error";
import multer from "multer";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let status = 500;
  let message = err.message;
  let error = err.errString;

  if (err instanceof BadRequestError) {
    status = 400;
    if (err instanceof multer.MulterError) message += " Multer Error";
  } else if (err instanceof UnauthorizedError) status = 401;
  else if (err instanceof ForbiddenError) status = 403;
  else if (err instanceof NotFoundError){
    status = 404;
    // message += " Not Found"
  } else if (err instanceof ConflictError) status = 409;
  else if (err instanceof LockedError) status = 423;
  else if (err instanceof InternalServerError) {
    status = 500;
    // message += " Internal Server Error"
  } else if (err instanceof NotImplementedError) status = 501;
  else if (err instanceof ServiceUnavailableError) status = 503;

  res.status(status).json({
    statusCode: status,
    message,
    error
  });
};