import BaseError from "./BaseError";

export default class ConflictError extends BaseError {
    constructor(
        message: string = "A resource with this identifier exists."
    ) {
        super(message, 409)
    }
}