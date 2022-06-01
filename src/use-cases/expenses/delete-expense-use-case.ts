import { ExpensesRepository } from "../../repositories/expenses-repository";

export class DeleteExpenseUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(id: string, deleteLinkedFixedExpense: boolean) {
        const expense = await this.expensesRepository.delete(id, deleteLinkedFixedExpense)
        return expense;
    }
}