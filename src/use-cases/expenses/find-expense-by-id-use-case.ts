import { ExpensesRepository } from "../../repositories/expenses-repository";

export class FindExpenseByIdUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(id: string) {
        const expense = await this.expensesRepository.findById(id)
        return expense;
    }
}