import express from "express";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../use-cases/users/create-user-use-case";
import { DeleteUserUseCase } from "../use-cases/users/delete-user-use-case";
import { FindUserByIdUseCase } from "../use-cases/users/find-user-by-id-use-case";
import { FindUsersUseCase } from "../use-cases/users/find-users-use-case";

export const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const findUsersUseCase = new FindUsersUseCase(prismaUsersRepository);

    const resp = await findUsersUseCase.execute();

    return res.status(201).json({ data: resp });
})

userRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    const prismaUsersRepository = new PrismaUsersRepository();
    const findUserByIdUseCase = new FindUserByIdUseCase(prismaUsersRepository);

    const resp = await findUserByIdUseCase.execute(id);

    return res.status(201).json({ data: resp });
})

userRoutes.post('/', async (req, res) => {    
    const { name, email, password } = req.body;

    const prismaUsersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

    const resp = await createUserUseCase.execute({
        name,
        email, 
        password
    })

    return res.status(201).json({ data: resp, message: 'Usuário criado com sucesso.' });
})

userRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const prismaUsersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

    await deleteUserUseCase.execute(id);

    return res.status(201).send();
})