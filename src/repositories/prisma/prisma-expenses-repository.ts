import moment from "moment";
import { moveMessagePortToContext } from "worker_threads";
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

    async create({ isFixed, name, value, responsibleId, groupId, paymentDate, totalInstallments, currentInstallment }: ExpenseData) {        
        
        if (isFixed) {
            const fixedExpense = await prisma.fixedExpense.create({
                data: {
                    name, 
                    value, 
                    responsibleId, 
                    groupId, 
                    paymentDay: Number(moment(paymentDate).format("MM")), 
                    lastMonthProcessed: Number(moment(paymentDate).format("MM")),
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
                    paymentDay: Number(moment(paymentDate).format("DD")), 
                    paymentMonth: Number(moment(paymentDate).format("MM")),
                    isPaid: false,
                    dateItWasPaid: null,
                    totalInstallments, 
                    currentInstallment,
                    fixedExpenseId: fixedExpense.id,
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