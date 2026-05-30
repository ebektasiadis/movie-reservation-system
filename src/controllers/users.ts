import { Context } from "hono";
import { CreateUserDto } from "../dtos/users";
import { usersService } from "../services";
import { UserNotFoundError } from "../shared/errors/users/UserNotFoundError";
import { UserAlreadyExistsError } from "../shared/errors/users/UserAlreadyExistsError";

export async function getAll(c: Context) {
   return c.json(await usersService.getAll())
}

export async function getByEmail(c: Context) {
   const { email } = c.req.param();
   const userResult = await usersService.getByEmail(email);

   if (!userResult.ok) {
      throw UserNotFoundError.withEmail(email);
   }

   return c.json(userResult.value);
}

export async function create(c: Context) {
   const body: CreateUserDto = await c.req.json();
   const userResult = await usersService.create(body);

   if (!userResult.ok) {
      throw UserAlreadyExistsError.withEmail(body.email)
   }

   const user = userResult.value;
   const location = new URL(
      `/api/users/${encodeURIComponent(user.email)}`,
      c.req.url,
   );

   return c.json(user, 201, {
      'Location': new URL(
         `/api/users/${encodeURIComponent(user.email)}`,
         c.req.url,
      ).href,
   });
}
