import express from "express";
import { validateToken } from "../auth";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "../use-cases/users/delete-user-use-case";
import { FindUserByIdUseCase } from "../use-cases/users/find-user-by-id-use-case";
import { FindUsersUseCase } from "../use-cases/users/find-users-use-case";

export const userRoutes = express.Router();

userRoutes.get('/', validateToken, async (req, res) => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const findUsersUseCase = new FindUsersUseCase(prismaUsersRepository);
        
    const resp = await findUsersUseCase.execute();    

    return res.status(201).json({ data: resp });
})

userRoutes.get('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const prismaUsersRepository = new PrismaUsersRepository();
    const findUserByIdUseCase = new FindUserByIdUseCase(prismaUsersRepository);

    const resp = await findUserByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

userRoutes.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const prismaUsersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

    await deleteUserUseCase.execute(id);

    return res.status(201).send();
})