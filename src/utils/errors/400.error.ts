import { AppError } from "./app.error";

export class BadRequestError extends AppError {
  constructor( message:string = "BadRequest" ){
    super(400, message, "Bad Request");
  }
}

export class UnauthorizedError extends AppError {
  constructor( message:string = "Unauthorized" ){
    super(401, message, "Unauthorized");
  }
}

export class ForbiddenError extends AppError {
  constructor( message:string = "Forbidden" ){
    super(403, message, "Forbidden");
  }
}

export class NotFoundError extends AppError {
  constructor( message:string = "NotFound" ){
    super(404, message, "Not Found");
  }
}

export class ConflictError extends AppError {
  constructor( message:string = "Conflict" ){
    super(409, message, "Conflict");
  }
}

export class LockedError extends AppError {
  constructor( message:string = "Locked" ){
    super(423, message, "Locked");
  }
}