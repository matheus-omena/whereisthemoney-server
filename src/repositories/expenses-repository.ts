export interface ExpenseQueryData {    
    isFixed: boolean;
    name: string;    
    value: number;
    responsibleId: string;
    groupId: string;
    paymentDate?: Date;
    totalInstallments?: number;
    currentInstallment?: number;
}

export interface ExpenseData {    
    isFixed: boolean;
    name: string;    
    value: number;
    responsibleId: string;
    groupId: string;
    paymentDay: number;     
    totalInstallments?: number;
    currentInstallment?: number;    
}

export interface UpdateExpenseData {    
    name: string;    
    value: number;
    responsibleId: string;
    groupId: string;
    paymentDay: number;    
}

export interface ExpensesRepository {
    find: () => Promise<any[]>;
    findById: (id: string) => Promise<any>;
    findByGroup: (groupId: string, month: number) => Promise<any[]>;
    create: (data: ExpenseData) => Promise<ExpenseQueryData | any>;
    update: (id: string, data: UpdateExpenseData, updateLinkedFixedExpense: boolean) => Promise<any>;
    delete: (id: string, deleteLinkedFixedExpense: boolean) => Promise<void>;
    processNextMonthExpenses: () => Promise<void>;
    pay: (id: string) => Promise<void>;
    payGroup: (groupId: string, month: number) => Promise<void>;
    balanceByResponsible: (month: number) => Promise<any>;
    balanceByGroup: (month: number) => Promise<any>;
}