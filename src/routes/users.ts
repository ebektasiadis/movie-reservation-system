import { Hono } from "hono";
import { usersService } from "../services";
import { CreateUserDto } from "../dtos/users";

const users = new Hono();

users.get('/', async (c) => {
   return c.json(await usersService.getAll())
});

users.get('/:email', async (c) => {
   const { email } = c.req.param();
   const user = await usersService.getByEmail(email)

   if(!user) {
      return c.text('user not found', 404);
   }

   return c.json(user);
})

users.post('/', async (c) => {
   const body: CreateUserDto = await c.req.json();

   console.log(body)

   return c.json(usersService.create(body));
});

export default users;
