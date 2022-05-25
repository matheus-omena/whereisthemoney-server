import { ResponsiblesRepository } from "../../repositories/responsibles-repository";

export class FindResponsiblesUseCase {    
    constructor(
        private responsiblesRepository: ResponsiblesRepository
    ) {}

    async execute() {
        const responsible = await this.responsiblesRepository.find()
        return responsible;
    }
}