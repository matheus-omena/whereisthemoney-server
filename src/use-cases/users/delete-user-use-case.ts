import { UsersRepository } from "../../repositories/users-repository";

export class DeleteUserUseCase {    
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(id: string) {
        const user = await this.usersRepository.delete(id)
        return user;
    }
}