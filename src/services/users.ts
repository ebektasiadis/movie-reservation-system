import { CreateUserDto } from "../dtos/users";
import { usersRepository } from "../repositories";

export async function getAll() {
    return await usersRepository.findMany();
}

export async function getByEmail(email: string) {
    return await usersRepository.findByEmail(email);
}

export async function create(userDto: CreateUserDto) {

    const user = await usersRepository.findByEmail(userDto.email);

    if(user) {
        return null;
    }

    return await usersRepository.insert(userDto);
}