import { CreateUserDto } from "../dtos/users";
import { usersRepository } from "../repositories";

export async function getAll() {
    return await usersRepository.findMany();
}

export async function getByEmail(email: string) {
    return await usersRepository.findByEmail(email);
}

export async function create(userDto: CreateUserDto) {
    return await usersRepository.insert(userDto);
}