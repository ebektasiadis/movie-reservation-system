import { ProblemDetails } from "../../types";
import { ProblemDetailsError } from "../ProblemDetailsError";

export class UserAlreadyExistsError extends ProblemDetailsError {
    private constructor(optDetails?: Partial<ProblemDetails>) {
        super({
            title: "User already exists",
            type: "user-already-exists",
            status: 409,
            ...(optDetails || {}),
        });
    }

    static withEmail(email: string) {
        return new UserAlreadyExistsError({
            detail: `The user with email ${email} already exists.`,
            extensions: { email }
        });
    }
}