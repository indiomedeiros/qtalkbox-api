import BaseError from "./BaseError";

export default class UnautorizedError extends BaseError {
  constructor(message: string = "invalid token") {
    super(message, 401);
  }
}
