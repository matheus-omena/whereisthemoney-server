import express from "express";
import { validateToken } from "../auth";
import { PrismaExpenseGroupsRepository } from "../repositories/prisma/prisma-expense-groups-repository";
import { CreateExpenseGroupUseCase } from "../use-cases/expense-groups/create-expense-group-use-case";
import { DeleteExpenseGroupUseCase } from "../use-cases/expense-groups/delete-expense-group-use-case";
import { FindExpenseGroupByIdUseCase } from "../use-cases/expense-groups/find-expense-group-by-id-use-case";
import { FindExpenseGroupsUseCase } from "../use-cases/expense-groups/find-expense-groups-use-case";
import { UpdateExpenseGroupUseCase } from "../use-cases/expense-groups/update-expense-group-use-case";

export const expenseGroupRoutes = express.Router();

expenseGroupRoutes.get('/', validateToken, async (req, res) => {
    const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
    const findExpenseGroupsUseCase = new FindExpenseGroupsUseCase(prismaExpenseGroupsRepository);

    const resp = await findExpenseGroupsUseCase.execute();

    return res.status(201).json({ data: resp });
})

expenseGroupRoutes.get('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
    const findExpenseGroupByIdUseCase = new FindExpenseGroupByIdUseCase(prismaExpenseGroupsRepository);

    const resp = await findExpenseGroupByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

expenseGroupRoutes.post('/', validateToken, async (req, res) => {    
    const { name, color, type, paymentDate, categoryId } = req.body;

    const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
    const createExpenseGroupUseCase = new CreateExpenseGroupUseCase(prismaExpenseGroupsRepository);

    const resp = await createExpenseGroupUseCase.execute({
        name,
        color,
        type,
        paymentDate,
        categoryId
    })

    return res.status(201).json({ data: resp, message: 'Grupo de despesas criado com sucesso.' });
})

expenseGroupRoutes.put('/', validateToken, async (req, res) => {    
    const { id, name, color, type, paymentDate, categoryId } = req.body;

    const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
    const updateExpenseGroupUseCase = new UpdateExpenseGroupUseCase(prismaExpenseGroupsRepository);

    const resp = await updateExpenseGroupUseCase.execute({
        id,
        name,
        color,
        type,
        paymentDate,
        categoryId
    })

    return res.status(201).json({ message: 'Grupo de despesas atualizado com sucesso.' });
})

expenseGroupRoutes.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const prismaExpenseGroupsRepository = new PrismaExpenseGroupsRepository();
    const deleteExpenseGroupUseCase = new DeleteExpenseGroupUseCase(prismaExpenseGroupsRepository);

    await deleteExpenseGroupUseCase.execute(id);

    return res.status(201).send();
})