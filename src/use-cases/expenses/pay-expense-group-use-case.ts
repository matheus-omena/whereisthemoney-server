import { ExpensesRepository } from "../../repositories/expenses-repository";

export class PayExpenseGroupUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(id: string, month: number) {
        const expense = await this.expensesRepository.payGroup(id, month);

        return expense;
    }
}