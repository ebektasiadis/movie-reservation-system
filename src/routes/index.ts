import { Hono } from "hono";
import users from "./users";

const routes = new Hono();

routes.route('/users', users);

export default routes;