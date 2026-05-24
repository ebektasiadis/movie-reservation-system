import { CreateUserDto } from "../dtos/users";
import { User } from "../generated/prisma/client";
import { prisma } from "../lib/db";

export async function findMany(): Promise<User[]> {
    return await prisma.user.findMany()
}

export async function findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({where: { email }})
}

export async function insert(userDto: CreateUserDto): Promise<User> {
    return await prisma.user.create({data: userDto})
}