import { Hono } from "hono";
import { usersController } from "../controllers";

const users = new Hono();

users.get('/', usersController.getAll);
users.get('/:email', usersController.getByEmail);
users.post('/', usersController.create);

export default users;
