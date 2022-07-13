import { ExpensesRepository } from "../../repositories/expenses-repository";

export interface UpdateExpenseUseCaseRequest {    
    name: string;    
    value: number;
    responsibleId: string;
    groupId: string;
    paymentDay: number;    
}

export class UpdateExpenseUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(id: string, request: UpdateExpenseUseCaseRequest, updateLinkedFixedExpense: boolean) {
        const group = await this.expensesRepository.update(id, request, updateLinkedFixedExpense)

        return group;
    }
}