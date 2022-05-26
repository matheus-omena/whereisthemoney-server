import { AuthRepository } from "../../repositories/auth-repository";

export interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {    
    constructor(
        private authRepository: AuthRepository
    ) {}

    async execute(request: RegisterUseCaseRequest) {
        const { name, email, password } = request;

        const user = await this.authRepository.create({
            name,
            email,
            password
        })

        return user;
    }
}