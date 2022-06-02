import { ExpensesRepository } from "../../repositories/expenses-repository";

export class FindExpensesUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute() {
        const expense = await this.expensesRepository.find()
        return expense;
    }
}