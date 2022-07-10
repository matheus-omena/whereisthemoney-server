import moment from "moment";
import { userSessionId } from "../../auth";
import { prisma } from "../../prisma";
import { ExpenseData, ExpensesRepository, UpdateExpenseData } from "../expenses-repository";

export class PrismaExpensesRepository implements ExpensesRepository {    
    async find() {  
        const expenses = await prisma.monthlyExpense.findMany({
            select: {
                id: true,
                name: true,
                value: true,
                paymentDay: true,
                paymentMonth: true,
                totalInstallments: true,
                currentInstallment: true,
                isPaid: true,
                dateItWasPaid: true,
                responsible: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                    }
                },
                group: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        type: true,
                        paymentDay: true                        
                    }
                },
            },
            where: {
                createdBy: userSessionId
            }           
        });
        return expenses;        
    };

    async findById(id: string) {  
        const expense = await prisma.monthlyExpense.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                value: true,
                paymentDay: true,
                paymentMonth: true,
                totalInstallments: true,
                currentInstallment: true,
                isPaid: true,
                dateItWasPaid: true,
                responsible: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                group: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                fixedExpenseId: true
            }    
        });

        return expense;
    };

    async findByGroup(groupId: string, month: number) {  
        const expenses = await prisma.monthlyExpense.findMany({
            where: {
                groupId: groupId,
                paymentMonth: month
            },
            select: {
                id: true,
                name: true,
                value: true,
                paymentDay: true,
                paymentMonth: true,
                totalInstallments: true,
                currentInstallment: true,
                isPaid: true,
                dateItWasPaid: true,
                responsible: {  
                    select: {
                        id: true,
                        name: true
                    }
                },
                group: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                fixedExpenseId: true
            }    
        });

        return expenses;
    };

    async create({ isFixed, name, value, responsibleId, groupId, paymentDay, totalInstallments, currentInstallment }: ExpenseData) {
        if (isFixed) {
            const fixedExpense = await prisma.fixedExpense.create({
                data: {
                    name, 
                    value, 
                    responsibleId, 
                    groupId, 
                    paymentDay: paymentDay, 
                    lastMonthProcessed: Number(moment().format("MM")),
                    totalInstallments, 
                    currentInstallment,                    
                    createdBy: userSessionId
                }
            });

            const monthlyExpense = await prisma.monthlyExpense.create({
                data: {
                    name, 
                    value, 
                    responsibleId, 
                    groupId, 
                    paymentDay: paymentDay, 
                    paymentMonth: Number(moment().format("MM")),
                    isPaid: false,
                    dateItWasPaid: null,                    
                    fixedExpenseId: fixedExpense.id,
                    createdBy: userSessionId
                }
            });
        }  
        else {
            await prisma.monthlyExpense.create({
                data: {
                    name, 
                    value, 
                    responsibleId, 
                    groupId, 
                    paymentDay: paymentDay, 
                    paymentMonth: Number(moment().format("MM")),
                    isPaid: false,
                    dateItWasPaid: null,                                     
                    createdBy: userSessionId
                }
            });    
        }
    };

    async update(id: string, { name, value, responsibleId, groupId, paymentDay, updateAllLinkedExpenses }: UpdateExpenseData) {
        const expense = await prisma.monthlyExpense.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,                
                totalInstallments: true,
                currentInstallment: true,
                isPaid: true,
                dateItWasPaid: true,
                responsibleId: true,
                groupId: true,
                fixedExpenseId: true
            }    
        });

        await prisma.monthlyExpense.update({
            data: {
                name, 
                value, 
                responsibleId, 
                groupId, 
                paymentDay,                
            },
            where: {
                id: id
            }
        });

        if (updateAllLinkedExpenses && expense?.fixedExpenseId) {
            await prisma.fixedExpense.update({
                data: {
                    name, 
                    value, 
                    responsibleId, 
                    groupId, 
                    paymentDay,                
                },
                where: {
                    id: expense?.fixedExpenseId
                }
            });
        }
        return null;
    };

    async delete(id: string, deleteLinkedFixedExpense: boolean) {        
        const expense = await prisma.monthlyExpense.findUnique({
            where: {
                id: id
            }
        })

        if (expense) {            
            await prisma.monthlyExpense.delete({
                where: {
                    id: id
                }
            });

            if (deleteLinkedFixedExpense) {
                await prisma.fixedExpense.delete({
                    where: {
                        id: expense.fixedExpenseId!
                    }
                })
            }
        }        
    };

    async processExpenses() {
        const actualMonth = moment().day();

        const fixedExpenses = await prisma.fixedExpense.findMany({
            where: {
                createdBy: userSessionId
            }
        })

        fixedExpenses.map(async (item) => {
            const monthlyExpense = await prisma.monthlyExpense.findFirst({
                where: {
                    createdBy: userSessionId,
                    paymentMonth: actualMonth,
                    fixedExpenseId: item.id
                }
            });

            if (!monthlyExpense) {
                // mágica acontece
            }
        })
    };
}