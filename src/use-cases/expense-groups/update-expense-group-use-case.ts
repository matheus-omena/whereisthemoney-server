import { ExpenseGroupsRepository } from "../../repositories/expense-group-repository";

export interface UpdateExpenseGroupUseCaseRequest {
    id: string;
    name: string;    
    color: string;
    type: number;
    paymentDate: Date;
    categoryId: string; 
}

export class UpdateExpenseGroupUseCase {    
    constructor(
        private groupsRepository: ExpenseGroupsRepository
    ) {}

    async execute(request: UpdateExpenseGroupUseCaseRequest) {
        const { id, name, color, type, paymentDate, categoryId } = request;        

        const group = await this.groupsRepository.update({
            id,
            name,
            color,
            type,
            paymentDate,
            categoryId
        })

        return group;
    }
}