import { Context } from "hono";
import { CreateUserDto } from "../dtos/users";
import { usersService } from "../services";

export async function getAll(c: Context) {
   return c.json(await usersService.getAll())
}

export async function getByEmail(c: Context) {
   const { email } = c.req.param();
   const user = await usersService.getByEmail(email)

   if(!user) {
      return c.text('user not found', 404);
   }

   return c.json(user);
}

export async function create(c: Context) {
   const body: CreateUserDto = await c.req.json();
   return c.json(await usersService.create(body));
}
