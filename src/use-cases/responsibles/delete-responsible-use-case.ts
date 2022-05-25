import { ResponsiblesRepository } from "../../repositories/responsibles-repository";

export class DeleteResponsibleUseCase {    
    constructor(
        private responsiblesRepository: ResponsiblesRepository
    ) {}

    async execute(id: string) {
        const responsible = await this.responsiblesRepository.delete(id)
        return responsible;
    }
}