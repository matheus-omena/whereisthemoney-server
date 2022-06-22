import { ExpensesRepository } from "../../repositories/expenses-repository";

export class FindExpensesByGroupUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(groupId: string, month: number) {
        const expense = await this.expensesRepository.findByGroup(groupId, month);
        return expense;
    }
}