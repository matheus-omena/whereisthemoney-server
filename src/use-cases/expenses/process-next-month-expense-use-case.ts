import { ExpensesRepository } from "../../repositories/expenses-repository";

export class ProcessNextMonthExpensesUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute() {
        const expenses = await this.expensesRepository.processNextMonthExpenses()

        return expenses;
    }
}