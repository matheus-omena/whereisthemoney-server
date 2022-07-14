import { ExpensesRepository } from "../../repositories/expenses-repository";

export class PayExpenseUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(id: string) {
        const expense = await this.expensesRepository.pay(id);

        return expense;
    }
}