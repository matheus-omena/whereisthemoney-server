import { ExpenseGroupsRepository } from "../../repositories/expense-group-repository";

export class DeleteExpenseGroupUseCase {    
    constructor(
        private groupsRepository: ExpenseGroupsRepository
    ) {}

    async execute(id: string) {
        const group = await this.groupsRepository.delete(id)
        return group;
    }
}