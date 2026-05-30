import { ContentfulStatusCode } from "hono/utils/http-status";

export type ProblemDetails = {
    title: string;      // Short, human-readable summary
    detail?: string;    // Human-readable explanation
    type: string;       // URI identifying the error type
    status: ContentfulStatusCode;     // HTTP status code
    instance?: string;  // URI of the specific occurrence
    extensions?: Record<string, unknown> // Extensions for the specific problem
}