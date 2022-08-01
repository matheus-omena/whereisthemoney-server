import { ExpenseGroupsRepository } from "../../repositories/expense-groups-repository";

export interface UpdateExpenseGroupUseCaseRequest {    
    name: string;    
    color: string;
    type: number;
    paymentDay?: number;    
}

export class UpdateExpenseGroupUseCase {    
    constructor(
        private groupsRepository: ExpenseGroupsRepository
    ) {}

    async execute(id: string, request: UpdateExpenseGroupUseCaseRequest) {
        const { name, color, type, paymentDay } = request;        

        const group = await this.groupsRepository.update(id, {        
            name,
            color,
            type,
            paymentDay            
        })

        return group;
    }
}