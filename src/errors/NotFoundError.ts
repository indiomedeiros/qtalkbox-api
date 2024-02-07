import BaseError from "./BaseError";

export default class NotFoundError extends BaseError {
  constructor(message: string = "Was not found.") {
    super(message, 404);
  }
}
