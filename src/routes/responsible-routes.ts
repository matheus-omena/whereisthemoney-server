import express from "express";
import { PrismaResponsiblesRepository } from "../repositories/prisma/prisma-responsibles-repository";
import { CreateResponsibleUseCase } from "../use-cases/responsibles/create-responsible-use-case";
import { DeleteResponsibleUseCase } from "../use-cases/responsibles/delete-responsible-use-case";
import { FindResponsibleByIdUseCase } from "../use-cases/responsibles/find-responsible-by-id-use-case";
import { FindResponsiblesUseCase } from "../use-cases/responsibles/find-responsibles-use-case";

export const responsibleRoutes = express.Router();

responsibleRoutes.get('/', async (req, res) => {
    const prismaResponsiblesRepository = new PrismaResponsiblesRepository();
    const findResponsiblesUseCase = new FindResponsiblesUseCase(prismaResponsiblesRepository);

    const resp = await findResponsiblesUseCase.execute();

    return res.status(201).json({ data: resp });
})

responsibleRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const prismaResponsiblesRepository = new PrismaResponsiblesRepository();
    const findResponsibleByIdUseCase = new FindResponsibleByIdUseCase(prismaResponsiblesRepository);

    const resp = await findResponsibleByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

responsibleRoutes.post('/', async (req, res) => {    
    const { name, color } = req.body;

    const prismaResponsiblesRepository = new PrismaResponsiblesRepository();
    const createResponsibleUseCase = new CreateResponsibleUseCase(prismaResponsiblesRepository);

    const resp = await createResponsibleUseCase.execute({
        name,
        color
    })

    return res.status(201).json({ data: resp, message: 'Responsável criado com sucesso.' });
})

responsibleRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const prismaResponsiblesRepository = new PrismaResponsiblesRepository();
    const deleteResponsibleUseCase = new DeleteResponsibleUseCase(prismaResponsiblesRepository);

    await deleteResponsibleUseCase.execute(id);

    return res.status(201).send();
})