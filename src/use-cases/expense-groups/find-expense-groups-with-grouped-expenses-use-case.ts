import { ExpenseGroupsRepository } from "../../repositories/expense-groups-repository";

export class FindExpenseGroupsWithGroupedExpensesUseCase {    
    constructor(
        private groupsRepository: ExpenseGroupsRepository
    ) {}

    async execute(month: number) {
        const groups = await this.groupsRepository.findWithGroupedExpenses(month)
        return groups;
    }
}