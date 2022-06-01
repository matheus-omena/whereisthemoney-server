import moment from "moment";
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
                    isPaid: true,
                    dateItWasPaid: null,                    
                    fixedExpenseId: fixedExpense.id,
                    createdBy: userSessionId
                }
            });
        }  
        else {
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
                    createdBy: userSessionId
                }
            });    
        }      

        return null;
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