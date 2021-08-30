export class CustomError extends Error {
  name = "CustomError";

  constructor(message) {
    super(message);
  }
}
