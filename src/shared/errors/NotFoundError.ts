import { ProblemDetailsError } from "./ProblemDetailsError";

export class NotFoundError extends ProblemDetailsError {
    constructor() {
        super({
            title: "Resource not found",
            status: 404,
            type: "not-found",
        })
    }
}