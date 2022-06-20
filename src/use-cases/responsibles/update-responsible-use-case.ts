import { ResponsiblesRepository } from "../../repositories/responsibles-repository";

export interface UpdateResponsibleUseCaseRequest {
    name: string;
    color: string;    
}

export class UpdateResponsibleUseCase {    
    constructor(
        private responsiblesRepository: ResponsiblesRepository
    ) {}

    async execute(id: string, request: UpdateResponsibleUseCaseRequest) {
        const responsible = await this.responsiblesRepository.update(id, request);

        return responsible;
    }
}