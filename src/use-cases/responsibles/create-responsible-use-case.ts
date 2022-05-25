import { ResponsiblesRepository } from "../../repositories/responsibles-repository";

export interface CreateResponsibleUseCaseRequest {
    name: string;
    color: string;    
}

export class CreateResponsibleUseCase {    
    constructor(
        private responsiblesRepository: ResponsiblesRepository
    ) {}

    async execute(request: CreateResponsibleUseCaseRequest) {
        const { name, color } = request;        

        const responsible = await this.responsiblesRepository.create({
            name,
            color
        })

        return responsible;
    }
}