export class AppError extends Error {
  protected status: number;
  protected errString: string;

  constructor(status: number, message: string, err: string) {
    super(message);
    this.status = status;
    this.errString = err;
  }
};