export interface ExpenseGroupQueryData {    
    id: string;
    name: string;    
    color: string;
    type: number;
    paymentDay?: number;    
}

export interface ExpenseGroupData {    
    name: string;    
    color: string;
    type: number;
    paymentDay?: number;    
}

export interface ExpenseGroupWithGroupedExpensesData {
    id: string;
    name: string;
    color: string;
    totalValue: number;
    paymentPercentual?: number;
}

export interface ExpenseGroupsRepository {
    find: () => Promise<ExpenseGroupData[] | any>;
    findById: (id: string) => Promise<ExpenseGroupQueryData | any>;
    findWithGroupedExpenses: (month: number) => Promise<ExpenseGroupWithGroupedExpensesData[] | any>;
    create: (data: ExpenseGroupData) => Promise<ExpenseGroupQueryData | any>;
    update: (id:string, data: ExpenseGroupData) => Promise<ExpenseGroupQueryData | any>;
    delete: (id: string) => Promise<void>;
}