import { userSessionId } from "../../auth";
import { prisma } from "../../prisma";
import { ExpenseGroupData, ExpenseGroupsRepository } from "../expense-groups-repository";

export class PrismaExpenseGroupsRepository implements ExpenseGroupsRepository {
    async find() {
        const groups = await prisma.expenseGroup.findMany({
            select: {
                id: true,
                name: true,
                color: true,
                type: true,
                paymentDay: true,
                category: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                createdBy: userSessionId
            }
        });
        return groups;
    };

    async findWithGroupedExpenses(month: number) {        
        const groups = await prisma.expenseGroup.findMany({
            select: {
                id: true,
                name: true,
                color: true
            },
            where: {
                createdBy: userSessionId
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
    
        const totalNotPaidExpensesByGroup = await prisma.monthlyExpense.groupBy({
            by: ['groupId'],
            _sum: {
                value: true            
            },   
            where: {
                createdBy: userSessionId,
                paymentMonth: month,
                isPaid: false
            }     
        });
    
        let processedGroups: any[] = [];
        
        groups.map((item) => {        
            let total = totalExpensesByGroup.find(x => x.groupId == item.id) ? totalExpensesByGroup.find(x => x.groupId == item.id)?._sum.value : 0;
            let notPaid = totalNotPaidExpensesByGroup.find(x => x.groupId == item.id) ? totalNotPaidExpensesByGroup.find(x => x.groupId == item.id)?._sum.value : 0;        
            processedGroups.push(
                {
                    id: item.id,
                    name: item.name,
                    color: item.color,
                    totalValue: Number(total),
                    paymentPercentual: Number(100 - ((Number(notPaid) * 100) / Number(total)))
                }
            )    
        })

        return processedGroups;
    };

    async findById(id: string) {
        const group = await prisma.expenseGroup.findUnique({
            select: {
                id: true,
                name: true,
                color: true,
                type: true,
                paymentDay: true,
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            where: {
                id: id
            }
        });

        return group;
    };

    async create({ name, color, type, paymentDay, categoryId }: ExpenseGroupData) {
        const group = await prisma.expenseGroup.create({
            data: {
                name,
                color,
                type,
                paymentDay,
                categoryId,
                createdBy: userSessionId
            }
        })

        return group;
    };

    async update(id: string, { name, color, type, paymentDay, categoryId }: ExpenseGroupData) {
        const group = await prisma.expenseGroup.update({
            where: {
                id: id
            },
            data: {
                name,
                color,
                type,
                paymentDay,
                categoryId,
                createdBy: userSessionId
            }
        })

        return group;
    };

    async delete(id: string) {
        await prisma.expenseGroup.delete({
            where: {
                id: id
            }
        })
    };
}