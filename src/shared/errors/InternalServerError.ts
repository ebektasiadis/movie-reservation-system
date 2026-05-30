import { ProblemDetailsError } from "./ProblemDetailsError";

export class InternalServerError extends ProblemDetailsError {
    constructor(error: Error) {
        // TODO: add logging here to trace what went wrong
        super({
            title: "Internal Server Error",
            detail: "Something occurred on our side. We are working on it.",
            status: 500,
            type: "internal-server",
            extensions: process.env.NODE_ENV !== 'production' ? {
                message: error.message,
                cause: error.cause,
                stack: error.stack
            } : undefined
        })
    }
}