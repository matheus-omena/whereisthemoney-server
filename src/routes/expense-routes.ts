import express from "express";
import { validateToken } from "../auth";
import { PrismaExpensesRepository } from "../repositories/prisma/prisma-expenses-repository";
import { CreateExpenseUseCase } from "../use-cases/expenses/create-expense-use-case";
import { DeleteExpenseUseCase } from "../use-cases/expenses/delete-expense-use-case";
import { FindExpenseByIdUseCase } from "../use-cases/expenses/find-expense-by-id-use-case";
import { FindExpensesByGroupUseCase } from "../use-cases/expenses/find-expenses-by-group-use-case";
import { FindExpensesUseCase } from "../use-cases/expenses/find-expenses-use-case";

export const expenseRoutes = express.Router();

expenseRoutes.get('/', validateToken, async (req, res) => {
    const prismaExpensesRepository = new PrismaExpensesRepository();
    const findExpensesUseCase = new FindExpensesUseCase(prismaExpensesRepository);

    const resp = await findExpensesUseCase.execute();

    return res.status(201).json({ data: resp });
})

expenseRoutes.get('/bygroup/:groupId/month/:month', validateToken, async (req, res) => {    
    const { groupId, month } = req.params;
    const prismaExpensesRepository = new PrismaExpensesRepository();
    const findExpensesByGroupUseCase = new FindExpensesByGroupUseCase(prismaExpensesRepository);

    const resp = await findExpensesByGroupUseCase.execute(groupId, Number(month));

    return res.status(201).send(resp);
})

expenseRoutes.get('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const prismaExpensesRepository = new PrismaExpensesRepository();
    const findExpenseByIdUseCase = new FindExpenseByIdUseCase(prismaExpensesRepository);

    const resp = await findExpenseByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

expenseRoutes.post('/', validateToken, async (req, res) => {    
    const { isFixed, name, value, responsibleId, groupId, paymentDay, totalInstallments, currentInstallment } = req.body;

    const prismaExpensesRepository = new PrismaExpensesRepository();
    const createExpenseUseCase = new CreateExpenseUseCase(prismaExpensesRepository);

    try {
        await createExpenseUseCase.execute({
            isFixed, 
            name, 
            value, 
            responsibleId, 
            groupId, 
            paymentDay, 
            totalInstallments, 
            currentInstallment
        });
    }    
    catch (e) {
        return res.status(500).json({ message: 'Problema ao criar despesa.', e });    
    }

    return res.status(201).json({ message: 'Despesa criada com sucesso.' });
})

// expenseRoutes.put('/', validateToken, async (req, res) => {    
//     const { id, name, color, type, paymentDate, categoryId } = req.body;

//     const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
//     const updateExpenseGroupUseCase = new UpdateExpenseGroupUseCase(prismaExpenseGroupsRepository);

//     const resp = await updateExpenseGroupUseCase.execute({
//         id,
//         name,
//         color,
//         type,
//         paymentDate,
//         categoryId
//     })

//     return res.status(201).json({ message: 'Grupo de despesas atualizado com sucesso.' });
// })

expenseRoutes.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const { deleteLinkedFixedExpense } = req.body;
    const prismaExpensesRepository = new PrismaExpensesRepository();
    const deleteExpenseUseCase = new DeleteExpenseUseCase(prismaExpensesRepository);

    await deleteExpenseUseCase.execute(id, deleteLinkedFixedExpense);

    return res.status(201).send();
})