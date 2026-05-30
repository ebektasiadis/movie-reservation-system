import { Hono } from 'hono'
import routes from './routes'
import { ProblemDetailsError } from './shared/errors/ProblemDetailsError';
import { NotFoundError } from './shared/errors/NotFoundError';
import { InternalServerError } from './shared/errors/InternalServerError';
import { ProblemDetails } from './shared/types';

const app = new Hono()

app.route("/api", routes);

app.onError((error, c) => {
    const err = error instanceof ProblemDetailsError ? error : new InternalServerError(error)
    const problemDetails: ProblemDetails = {
        ...err.details,
        type: `${new URL(c.req.url).origin}/errors/${err.details.type}`,
        instance: c.req.url
    }

    return c.json(problemDetails, problemDetails.status, {
        "Content-Type": "application/problem+json"
    });
})

app.notFound((c) => {
    throw new NotFoundError();
})

export default app;
