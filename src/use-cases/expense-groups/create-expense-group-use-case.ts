import { ExpenseGroupsRepository } from "../../repositories/expense-groups-repository";

export interface CreateExpenseGroupUseCaseRequest {
    name: string;    
    color: string;
    type: number;
    paymentDay?: number;
    categoryId: string; 
}

export class CreateExpenseGroupUseCase {    
    constructor(
        private groupsRepository: ExpenseGroupsRepository
    ) {}

    async execute(request: CreateExpenseGroupUseCaseRequest) {
        const { name, color, type, paymentDay, categoryId } = request;        

        const group = await this.groupsRepository.create({
            name,
            color,
            type,
            paymentDay,
            categoryId
        })

        return group;
    }
}