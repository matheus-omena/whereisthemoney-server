import { ResponsiblesRepository } from "../../repositories/responsibles-repository";

export class FindResponsibleByIdUseCase {    
    constructor(
        private responsiblesRepository: ResponsiblesRepository
    ) {}

    async execute(id: string) {
        const responsible = await this.responsiblesRepository.findById(id)
        return responsible;
    }
}