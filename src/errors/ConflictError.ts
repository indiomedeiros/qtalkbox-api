import BaseError from "./BaseError";

export default class ConflictError extends BaseError {
    constructor(
        message: string = "Existe um recurso com esse identificador"
    ) {
        super(message, 409)
    }
}