import { CreateUserDto } from "../dtos/users";
import { User } from "../generated/prisma/client";
import { usersRepository } from "../repositories";
import { Result } from "../shared/result";

export async function getAll() {
    return await usersRepository.findMany();
}

export async function getByEmail(email: string): Promise<Result<User>> {
    const user = await usersRepository.findByEmail(email);

    return user
        ? { ok: true, value: user }
        : { ok: false, reason: "user_not_found" };
}

export async function create(userDto: CreateUserDto): Promise<Result<User>> {

    const user = await usersRepository.findByEmail(userDto.email);

    if (user) {
        return {
            ok: false, reason: "email_already_exists"
        };
    }

    return {
        ok: true,
        value: await usersRepository.insert(userDto)
    };
}