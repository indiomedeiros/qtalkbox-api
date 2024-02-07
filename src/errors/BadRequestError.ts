import BaseError from "./BaseError";

export default class BadRequestError extends BaseError {
  constructor(message: string = "An error occurred in the request.") {
    super(message, 400);
  }
}
