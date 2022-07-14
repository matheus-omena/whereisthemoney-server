import { ExpensesRepository } from "../../repositories/expenses-repository";

export class BalanceByResponsibleUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(month: number) {
        const expense = await this.expensesRepository.balanceByResponsible(month);
        return expense;
    }
}