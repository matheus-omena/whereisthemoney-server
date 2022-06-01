import express from "express";
import { validateToken } from "../auth";
import { PrismaExpenseGroupsRepository } from "../repositories/prisma/prisma-expense-groups-repository";
import { PrismaExpensesRepository } from "../repositories/prisma/prisma-expenses-repository";
import { CreateExpenseGroupUseCase } from "../use-cases/expense-groups/create-expense-group-use-case";
import { DeleteExpenseGroupUseCase } from "../use-cases/expense-groups/delete-expense-group-use-case";
import { FindExpenseGroupByIdUseCase } from "../use-cases/expense-groups/find-expense-group-by-id-use-case";
import { FindExpenseGroupsUseCase } from "../use-cases/expense-groups/find-expense-groups-use-case";
import { UpdateExpenseGroupUseCase } from "../use-cases/expense-groups/update-expense-group-use-case";
import { CreateExpenseUseCase } from "../use-cases/expenses/create-expense-use-case";

export const expenseRoutes = express.Router();

// expenseRoutes.get('/', validateToken, async (req, res) => {
//     const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
//     const findExpenseGroupsUseCase = new FindExpenseGroupsUseCase(prismaExpenseGroupsRepository);

//     const resp = await findExpenseGroupsUseCase.execute();

//     return res.status(201).json({ data: resp });
// })

// expenseRoutes.get('/:id', validateToken, async (req, res) => {
//     const { id } = req.params;
//     const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
//     const findExpenseGroupByIdUseCase = new FindExpenseGroupByIdUseCase(prismaExpenseGroupsRepository);

//     const resp = await findExpenseGroupByIdUseCase.execute(id);

//     return res.status(201).json({ data: resp });
// })

expenseRoutes.post('/', validateToken, async (req, res) => {    
    const { isFixed, name, value, responsibleId, groupId, paymentDay, totalInstallments, currentInstallment } = req.body;

    const prismaExpensesRepository = new PrismaExpensesRepository();
    const createExpenseUseCase = new CreateExpenseUseCase(prismaExpensesRepository);

    try {
        const resp = await createExpenseUseCase.execute({
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

// expenseRoutes.delete('/:id', validateToken, async (req, res) => {
//     const { id } = req.params;
//     const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
//     const deleteExpenseGroupUseCase = new DeleteExpenseGroupUseCase(prismaExpenseGroupsRepository);

//     await deleteExpenseGroupUseCase.execute(id);

//     return res.status(201).send();
// })