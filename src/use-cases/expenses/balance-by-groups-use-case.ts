import { ExpensesRepository } from "../../repositories/expenses-repository";

export class BalanceByGroupUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(month: number) {
        const expense = await this.expensesRepository.balanceByGroup(month);
        return expense;
    }
}