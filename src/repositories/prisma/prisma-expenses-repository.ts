import { userSessionId } from "../../auth";
import { prisma } from "../../prisma";
import { ExpenseData, ExpenseQueryData, ExpensesRepository } from "../expenses-repository";

export class PrismaExpensesRepository implements ExpensesRepository {    
    async find() {  
        const expenses = await prisma.monthlyExpense.findMany();
        return expenses;        
    };

    async findById(id: string) {  
        const expense = await prisma.monthlyExpense.findUnique({
            where: {
                id: id
            }
        });

        return expense;
    };

    async create({ name, color, type, paymentDate, categoryId }: ExpenseData) {
        const expense = await prisma.expenseGroup.create({
            data: {
                name,
                color,
                type,
                paymentDate,
                categoryId,
                createdBy: userSessionId
            }
        })

        return expense;
    };

    async update(data: ExpenseQueryData) {
        // const group = await prisma.expenseGroup.update({
        //     where: {
        //         id: id
        //     },
        //     data: {
        //         name,
        //         color,
        //         type,
        //         paymentDate,
        //         categoryId,
        //         createdBy: userSessionId
        //     }
        // })

        // return group;[]
        return null;
    };

    async delete(id: string) {
        /*await prisma.expenseGroup.delete({
            where: {
                id: id
            }
        })*/
    };

    async processExpenses() {
        
    };
}