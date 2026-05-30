import { ProblemDetails } from "../../types";
import { ProblemDetailsError } from "../ProblemDetailsError";

export class UserNotFoundError extends ProblemDetailsError {
    private constructor(optDetails?: Partial<ProblemDetails>) {
        super({
            title: "User not found",
            type: "user-not-found",
            status: 404,
            ...(optDetails || {}),
        });
    }

    static withEmail(email: string) {
        return new UserNotFoundError({
            detail: `The user with email ${email} could not be found.`,
            extensions: { email }
        });
    }
}