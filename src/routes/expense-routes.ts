import express from "express";
import { validateToken } from "../auth";
import { PrismaExpensesRepository } from "../repositories/prisma/prisma-expenses-repository";
import { BalanceByResponsibleUseCase } from "../use-cases/expenses/balance-by-responsibles-use-case";
import { BalanceByGroupUseCase } from "../use-cases/expenses/balance-by-groups-use-case";
import { CreateExpenseUseCase } from "../use-cases/expenses/create-expense-use-case";
import { DeleteExpenseUseCase } from "../use-cases/expenses/delete-expense-use-case";
import { FindExpenseByIdUseCase } from "../use-cases/expenses/find-expense-by-id-use-case";
import { FindExpensesByGroupUseCase } from "../use-cases/expenses/find-expenses-by-group-use-case";
import { FindExpensesUseCase } from "../use-cases/expenses/find-expenses-use-case";
import { PayExpenseGroupUseCase } from "../use-cases/expenses/pay-expense-group-use-case";
import { PayExpenseUseCase } from "../use-cases/expenses/pay-expense-use-case";
import { ProcessNextMonthExpensesUseCase } from "../use-cases/expenses/process-next-month-expense-use-case";
import { UpdateExpenseUseCase } from "../use-cases/expenses/update-expense-use-case";

export const expenseRoutes = express.Router();
const prismaExpensesRepository = new PrismaExpensesRepository();

expenseRoutes.get('/balancebyresponsibles/month/:month', validateToken, async (req, res) => {
    const { month } = req.params;
    const balanceByResponsibleUseCase = new BalanceByResponsibleUseCase(prismaExpensesRepository);

    const resp = await balanceByResponsibleUseCase.execute(Number(month));

    return res.status(201).send(resp);
})

expenseRoutes.get('/balancebygroups/month/:month', validateToken, async (req, res) => {
    const { month } = req.params;
    const balanceByGroupUseCase = new BalanceByGroupUseCase(prismaExpensesRepository);

    const resp = await balanceByGroupUseCase.execute(Number(month));

    return res.status(201).send(resp);
})

expenseRoutes.get('/', validateToken, async (req, res) => {
    const findExpensesUseCase = new FindExpensesUseCase(prismaExpensesRepository);

    const resp = await findExpensesUseCase.execute();

    return res.status(201).json({ data: resp });
})

expenseRoutes.get('/bygroup/:groupId/month/:month', validateToken, async (req, res) => {
    const { groupId, month } = req.params;
    const findExpensesByGroupUseCase = new FindExpensesByGroupUseCase(prismaExpensesRepository);

    const resp = await findExpensesByGroupUseCase.execute(groupId, Number(month));

    return res.status(201).send(resp);
})

expenseRoutes.get('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const findExpenseByIdUseCase = new FindExpenseByIdUseCase(prismaExpensesRepository);

    const resp = await findExpenseByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

expenseRoutes.post('/', validateToken, async (req, res) => {
    const { isFixed, name, value, responsibleId, groupId, categoryId, paymentDay, totalInstallments, currentInstallment } = req.body;

    const createExpenseUseCase = new CreateExpenseUseCase(prismaExpensesRepository);

    try {
        await createExpenseUseCase.execute({
            isFixed,
            name,
            value,
            responsibleId,
            groupId,
            categoryId,
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

expenseRoutes.put('/pay/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const payExpense = new PayExpenseUseCase(prismaExpensesRepository);

    await payExpense.execute(id)
        .then(resp => {
            return res.status(201).json({ message: 'Despesa paga com sucesso.' })
        })
        .catch(error => {
            return res.status(500).json({ data: error, message: 'Erro ao pagar despesa' })
        })
})

expenseRoutes.put('/payGroup/:groupId/month/:month', validateToken, async (req, res) => {
    const { groupId, month } = req.params;
    const payExpenseGroup = new PayExpenseGroupUseCase(prismaExpensesRepository);

    await payExpenseGroup.execute(groupId, Number(month))
        .then(resp => {
            return res.status(201).json({ message: 'Grupo de despesas pago com sucesso.' })
        })
        .catch(error => {
            return res.status(500).json({ data: error, message: 'Erro ao pagar grupo de despesas' })
        })
})

expenseRoutes.put('/processNextMonthExpenses', validateToken, async (req, res) => {
    const processNextMonthExpenses = new ProcessNextMonthExpensesUseCase(prismaExpensesRepository);

    await processNextMonthExpenses.execute()
        .then(resp => {
            return res.status(201).json({ message: 'Despesas processadas com sucesso.' })
        })
        .catch(error => {
            return res.status(500).json({ data: error, message: 'Erro ao processar despesas' })
        })
})

expenseRoutes.put('/:id/updateLinkedFixedExpense/:updateLinkedFixedExpense', validateToken, async (req, res) => {
    const { id, updateLinkedFixedExpense } = req.params;
    const { name, value, responsibleId, groupId, categoryId, paymentDay } = req.body;

    const updateExpensesUseCase = new UpdateExpenseUseCase(prismaExpensesRepository);

    const resp = await updateExpensesUseCase.execute(id, {
        name,
        value,
        responsibleId,
        groupId,
        categoryId,
        paymentDay        
    }, updateLinkedFixedExpense === "true")

    return res.status(201).json({ message: 'Despesa atualizada com sucesso.' });
})

expenseRoutes.delete('/:id/deleteLinkedFixedExpense/:deleteLinkedFixedExpense', validateToken, async (req, res) => {
    const { id, deleteLinkedFixedExpense } = req.params;
    const deleteExpenseUseCase = new DeleteExpenseUseCase(prismaExpensesRepository);

    await deleteExpenseUseCase.execute(id, deleteLinkedFixedExpense === "true");

    return res.status(201).json({ params: req.params });
})