import { ExpensesRepository } from "../../repositories/expenses-repository";

export interface UpdateExpenseUseCaseRequest {    
    name: string;    
    value: number;
    responsibleId: string;
    groupId: string;
    paymentDay: number;        
    updateAllLinkedExpenses?: boolean;
}

export class UpdateExpenseUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(id: string, request: UpdateExpenseUseCaseRequest) {
        const group = await this.expensesRepository.update(id, request)

        return group;
    }
}