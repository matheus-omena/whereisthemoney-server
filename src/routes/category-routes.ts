import express from "express";
import { validateToken } from "../auth";
import { PrismaCategoriesRepository } from "../repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "../use-cases/categories/create-category-use-case";
import { DeleteCategoryUseCase } from "../use-cases/categories/delete-category-use-case";
import { FindCategoriesUseCase } from "../use-cases/categories/find-categories-use-case";
import { FindCategoryByIdUseCase } from "../use-cases/categories/find-category-by-id-use-case";
import { UpdateCategoryUseCase } from "../use-cases/categories/update-category-use-case";

export const categoryRoutes = express.Router();

categoryRoutes.get('/', validateToken, async (req, res) => {
    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const findCategoriesUseCase = new FindCategoriesUseCase(prismaCategoriesRepository);

    const resp = await findCategoriesUseCase.execute();

    return res.status(201).send(resp);
})

categoryRoutes.get('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const findCategoryByIdUseCase = new FindCategoryByIdUseCase(prismaCategoriesRepository);

    const resp = await findCategoryByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

categoryRoutes.post('/', validateToken, async (req, res) => {    
    const { name } = req.body;

    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(prismaCategoriesRepository);

    const resp = await createCategoryUseCase.execute({ name })

    return res.status(201).json({ data: resp, message: 'Categoria criada com sucesso.' });
})

categoryRoutes.put('/:id', validateToken, async (req, res) => {    
    const { id } = req.params;
    const { name } = req.body;

    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const updateCategoryUseCase = new UpdateCategoryUseCase(prismaCategoriesRepository);

    const resp = await updateCategoryUseCase.execute(id, { name })

    return res.status(201).json({ data: resp, message: 'Categoria atualizada com sucesso.' });
})

categoryRoutes.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const prismaCategoriesRepository = new PrismaCategoriesRepository();
    const deleteCategoryUseCase = new DeleteCategoryUseCase(prismaCategoriesRepository);

    await deleteCategoryUseCase.execute(id);

    return res.status(201).send();
})