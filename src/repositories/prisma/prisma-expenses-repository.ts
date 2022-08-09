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
                category: {
                    select: {
                        id: true,
                        name: true,                                            
                    }
                }
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
                category: {
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
                category: {
                    select: {
                        id: true,
                        name: true,                                            
                    }
                },
                fixedExpenseId: true
            },
            orderBy: [{
                paymentDay: 'asc'
            },
            {
                name: 'asc'
            }]
        });

        return expenses;
    };

    async create({ isFixed, name, value, responsibleId, groupId, categoryId, paymentDay, totalInstallments, currentInstallment }: ExpenseData) {
        if (isFixed) {
            const fixedExpense = await prisma.fixedExpense.create({
                data: {
                    name,
                    value,
                    responsibleId,
                    groupId,
                    categoryId,
                    paymentDay: paymentDay,
                    lastMonthProcessed: Number(moment().format("MM")),
                    totalInstallments,
                    currentInstallment: 1,
                    createdBy: userSessionId
                }
            });

            const monthlyExpense = await prisma.monthlyExpense.create({
                data: {
                    name,
                    value,
                    responsibleId,
                    groupId,
                    categoryId,
                    paymentDay: paymentDay,
                    paymentMonth: Number(moment().format("MM")),
                    isPaid: false,
                    dateItWasPaid: null,
                    fixedExpenseId: fixedExpense.id,
                    totalInstallments,
                    currentInstallment: 1,
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
                    categoryId,
                    paymentDay: paymentDay,
                    paymentMonth: Number(moment().format("MM")),
                    isPaid: false,
                    dateItWasPaid: null,
                    createdBy: userSessionId
                }
            });
        }
    };

    async update(id: string, { name, value, responsibleId, groupId, categoryId, paymentDay }: UpdateExpenseData, updateLinkedFixedExpense: boolean) {
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
                categoryId: true,
                fixedExpenseId: true
            }
        });

        await prisma.monthlyExpense.update({
            data: {
                name,
                value,
                responsibleId,
                groupId,
                categoryId,
                paymentDay
            },
            where: {
                id: id
            }
        });

        if (updateLinkedFixedExpense && expense?.fixedExpenseId) {
            await prisma.fixedExpense.update({
                data: {
                    name,
                    value,
                    responsibleId,
                    groupId,
                    categoryId,
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

    async processNextMonthExpenses() {
        const nextMonth = Number(moment().format("MM")) + 1;

        const fixedExpenses = await prisma.fixedExpense.findMany({
            where: {
                createdBy: userSessionId                
            }
        })        

        fixedExpenses.map(async (item) => {
            const process = ((item.currentInstallment && item.totalInstallments) && item.currentInstallment < item.totalInstallments);

            if (item.lastMonthProcessed <= nextMonth && process) {
                const monthlyExpense = await prisma.monthlyExpense.findFirst({
                    where: {
                        createdBy: userSessionId,
                        paymentMonth: nextMonth,
                        fixedExpenseId: item.id
                    }
                });

                if (!monthlyExpense) {
                    await prisma.monthlyExpense.create({
                        data: {
                            name: item.name,
                            value: item.value,
                            responsibleId: item.responsibleId,
                            groupId: item.groupId,
                            categoryId: item.categoryId,
                            paymentDay: item.paymentDay,
                            paymentMonth: nextMonth,
                            isPaid: false,
                            fixedExpenseId: item.id,
                            totalInstallments: item.totalInstallments,
                            currentInstallment:
                                item.lastMonthProcessed < nextMonth &&
                                    item.currentInstallment &&
                                    item.currentInstallment > 0 ?
                                    item.currentInstallment + 1 :
                                    item.lastMonthProcessed === nextMonth &&
                                        item.currentInstallment &&
                                        item.currentInstallment > 0 ?
                                        item.currentInstallment :
                                        undefined,
                            createdBy: userSessionId
                        }
                    })

                    if (item.lastMonthProcessed < nextMonth)
                        await prisma.fixedExpense.update({
                            data: {
                                currentInstallment: item.currentInstallment! + 1,
                                lastMonthProcessed: nextMonth
                            },
                            where: {
                                id: item.id
                            }
                        })
                }
            }
        })
    };

    async pay(id: string) {
        await prisma.monthlyExpense.update({
            data: {
                isPaid: true,
                dateItWasPaid: new Date()
            },
            where: {
                id: id
            }
        })
    };

    async payGroup(groupId: string, month: number) {
        await prisma.monthlyExpense.updateMany({
            data: {
                isPaid: true,
                dateItWasPaid: new Date()
            },
            where: {
                groupId: groupId,
                paymentMonth: month
            }
        })
    }

    async balanceByResponsible(month: number) {
        const responsibles = await prisma.responsible.findMany({
            select: {
                id: true,
                name: true,
                color: true
            },
            where: {
                createdBy: userSessionId
            },
            orderBy: {
                name: 'asc'
            }
        });  

        const totalExpensesByResponsible = await prisma.monthlyExpense.groupBy({
            by: ['responsibleId'],
            _sum: {
                value: true            
            },   
            where: {
                createdBy: userSessionId,                
                paymentMonth: month
            }     
        }); 

        let processedExpenses: any[] = [];
        
        responsibles.map((item) => {        
            let total = totalExpensesByResponsible.find(x => x.responsibleId == item.id) ? totalExpensesByResponsible.find(x => x.responsibleId == item.id)?._sum.value : 0;            
            processedExpenses.push(
                {                    
                    name: item.name,
                    color: item.color,
                    totalValue: Number(total),                    
                }
            )    
        })

        return processedExpenses;
    }

    async balanceByGroup(month: number) {
        const groups = await prisma.expenseGroup.findMany({
            select: {
                id: true,
                name: true,
                color: true
            },
            where: {
                createdBy: userSessionId
            },
            orderBy: {
                name: 'asc'
            }
        });  

        const totalExpensesByGroup = await prisma.monthlyExpense.groupBy({
            by: ['groupId'],
            _sum: {
                value: true            
            },   
            where: {
                createdBy: userSessionId,                
                paymentMonth: month
            }     
        }); 

        let processedExpenses: any[] = [];
        
        groups.map((item) => {        
            let total = totalExpensesByGroup.find(x => x.groupId == item.id) ? totalExpensesByGroup.find(x => x.groupId == item.id)?._sum.value : 0;            
            processedExpenses.push(
                {                    
                    name: item.name,
                    color: item.color,
                    totalValue: Number(total),                    
                }
            )    
        })

        return processedExpenses;
    }

    async balanceByCategory(month: number) {
        const categories = await prisma.expenseCategory.findMany({
            select: {
                id: true,
                name: true                
            },
            where: {
                createdBy: userSessionId
            },
            orderBy: {
                name: 'asc'
            }
        });  

        const totalExpensesByCategory = await prisma.monthlyExpense.groupBy({
            by: ['categoryId'],
            _sum: {
                value: true            
            },   
            where: {
                createdBy: userSessionId,                
                paymentMonth: month
            }     
        }); 

        let processedExpenses: any[] = [];
        
        categories.map((item) => {        
            let total = totalExpensesByCategory.find(x => x.categoryId == item.id) ? totalExpensesByCategory.find(x => x.categoryId == item.id)?._sum.value : 0;            
            processedExpenses.push(
                {                    
                    name: item.name,                    
                    totalValue: Number(total),                    
                }
            )    
        })

        return processedExpenses;
    }
}