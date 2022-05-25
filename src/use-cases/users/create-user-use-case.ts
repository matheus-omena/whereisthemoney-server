import { UsersRepository } from "../../repositories/users-repository";

export interface CreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {    
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute(request: CreateUserUseCaseRequest) {
        const { name, email, password } = request;

        const user = await this.usersRepository.create({
            name,
            email,
            password
        })

        return user;
    }
}