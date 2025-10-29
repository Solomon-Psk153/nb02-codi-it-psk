import { AppError } from "./app.error";

export class InternalServerError extends AppError {
  constructor( message:string = "InternalServerError" ){
    super(500, message, "Internal Server Error");
  }
}

export class NotImplementedError extends AppError {
  constructor( message:string = "NotImplemented" ){
    super(501, message, "Not Implemented");
  }
}

export class ServiceUnavailableError extends AppError {
  constructor( message:string = "ServiceUnavailable" ){
    super(503, message, "Service Unavailable");
  }
}