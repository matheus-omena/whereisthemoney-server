export interface ExpenseGroupQueryData {    
    id: string;
    name: string;    
    color: string;
    type: number;
    paymentDate: Date;
    categoryId: string;
}

export interface ExpenseGroupData {    
    name: string;    
    color: string;
    type: number;
    paymentDate: Date;
    categoryId: string;
}

export interface ExpenseGroupsRepository {
    find: () => Promise<ExpenseGroupData[] | any>;
    findById: (id: string) => Promise<ExpenseGroupQueryData | any>;
    create: (data: ExpenseGroupData) => Promise<ExpenseGroupQueryData | any>;
    update: (data: ExpenseGroupQueryData) => Promise<ExpenseGroupQueryData | any>;
    delete: (id: string) => Promise<void>;
}