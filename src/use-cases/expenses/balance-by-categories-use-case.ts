import { ExpensesRepository } from "../../repositories/expenses-repository";

export class BalanceByCategoriesUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(month: number) {
        const expense = await this.expensesRepository.balanceByCategory(month);
        return expense;
    }
}