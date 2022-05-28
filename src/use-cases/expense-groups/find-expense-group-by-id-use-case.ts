import { ExpenseGroupsRepository } from "../../repositories/expense-groups-repository";

export class FindExpenseGroupByIdUseCase {    
    constructor(
        private groupsRepository: ExpenseGroupsRepository
    ) {}

    async execute(id: string) {
        const group = await this.groupsRepository.findById(id)
        return group;
    }
}