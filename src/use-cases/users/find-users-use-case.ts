import { UsersRepository } from "../../repositories/users-repository";

export class FindUsersUseCase {    
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute() {
        const user = await this.usersRepository.find()
        return user;
    }
}