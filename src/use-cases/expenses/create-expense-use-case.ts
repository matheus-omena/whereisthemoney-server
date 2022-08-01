import { ExpensesRepository } from "../../repositories/expenses-repository";

export interface CreateExpenseUseCaseRequest {
    isFixed: boolean;
    name: string;    
    value: number;
    responsibleId: string;
    categoryId: string;
    groupId: string;
    paymentDay: number;    
    totalInstallments?: number;
    currentInstallment?: number;
}

export class CreateExpenseUseCase {    
    constructor(
        private expensesRepository: ExpensesRepository
    ) {}

    async execute(request: CreateExpenseUseCaseRequest) {
        const { isFixed, name, value, responsibleId, groupId, categoryId, paymentDay, totalInstallments, currentInstallment } = request;        

        const group = await this.expensesRepository.create({
            isFixed, 
            name, 
            value, 
            responsibleId, 
            groupId, 
            categoryId,
            paymentDay, 
            totalInstallments, 
            currentInstallment
        })

        return group;
    }
}