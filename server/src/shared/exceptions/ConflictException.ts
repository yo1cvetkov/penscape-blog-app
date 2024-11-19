export class ConflictException extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;

    Object.setPrototypeOf(this, ConflictException);
  }
}
