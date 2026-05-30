import { ProblemDetails } from "../types";

export class ProblemDetailsError extends Error {

    constructor(public readonly details: ProblemDetails) {
        super(details.title);
    }
}