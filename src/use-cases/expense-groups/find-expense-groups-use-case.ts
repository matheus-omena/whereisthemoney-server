import { ExpenseGroupsRepository } from "../../repositories/expense-group-repository";

export class FindExpenseGroupsUseCase {    
    constructor(
        private groupsRepository: ExpenseGroupsRepository
    ) {}

    async execute() {
        const group = await this.groupsRepository.find()
        return group;
    }
}