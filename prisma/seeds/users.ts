import { PrismaClient, User } from "../../src/generated/prisma/client";

export async function seedUsers(prisma: PrismaClient): Promise<Record<string, User>> {
    const alicia = await prisma.user.upsert({
        where: {email: "alicia@mrs.com"},
        update: {},
        create: {
          email: "ralicia@mrs.com",
          firstName: "Alicia",
          lastName: "Robinson",
          password: "password",
          role: "ADMIN"
        }});
      
        const bob = await prisma.user.upsert({
          where: {email: "rbob@mrs.com"},
          update: {},
          create: {
            email: "rbob@mrs.com",
            firstName: "Bob",
            lastName: "Ross",
            password: "password",
            role: "USER"
        }});

    return {alicia, bob}
}