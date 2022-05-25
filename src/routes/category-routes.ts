import express from "express";
import { PrismaCategoriesRepository } from "../repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "../use-cases/categories/create-category-use-case";
import { DeleteCategoryUseCase } from "../use-cases/categories/delete-category-use-case";
import { FindCategoriesUseCase } from "../use-cases/categories/find-categories-use-case";
import { FindCategoryByIdUseCase } from "../use-cases/categories/find-category-by-id-use-case";

export const categoryRoutes = express.Router();

categoryRoutes.get('/', async (req, res) => {
    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const findCategoriesUseCase = new FindCategoriesUseCase(prismaCategoriesRepository);

    const resp = await findCategoriesUseCase.execute();

    return res.status(201).json({ data: resp });
})

categoryRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const findCategoryByIdUseCase = new FindCategoryByIdUseCase(prismaCategoriesRepository);

    const resp = await findCategoryByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

categoryRoutes.post('/', async (req, res) => {    
    const { name, color } = req.body;

    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(prismaCategoriesRepository);

    const resp = await createCategoryUseCase.execute({ name })

    return res.status(201).json({ data: resp, message: 'Categoria criada com sucesso.' });
})

categoryRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const deleteCategoryUseCase = new DeleteCategoryUseCase(prismaCategoriesRepository);

    await deleteCategoryUseCase.execute(id);

    return res.status(201).send();
})