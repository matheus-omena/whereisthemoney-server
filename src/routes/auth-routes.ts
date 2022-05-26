import express from "express";
import { prisma } from "../prisma";
import { PrismaAuthRepository } from "../repositories/prisma/prisma-auth-repository";
import { RegisterUseCase } from "../use-cases/auth/register-use-case";

export const authRoutes = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRoutes.post('/register', async (req, res) => {    
    const { name, email, password } = req.body;

    const prismaAuthRepository = new PrismaAuthRepository();
    const registerUseCase = new RegisterUseCase(prismaAuthRepository);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const resp = await registerUseCase.execute({
        name,
        email, 
        password: passwordHash
    })

    return res.status(201).json({ data: resp });
})

authRoutes.post('/login', async (req, res) => {    
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    
    if (!user)
        return res.status(404).json({ data: "Usuário não encontrado!" });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) 
        return res.status(422).json({ data: "Senha inválida!" });

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user.id
        }, secret);

        const authUser = await prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                name: true,
                email: true
            }
        })

        res.status(200).json({ message: 'Usuário autenticado com sucesso!', token, user: authUser });

    } catch(error) {
        console.log(error);

        res.status(500).json({
            message: 'Houve um problema no servidor. Tente novamente mais tarde.'
        })
    }
        
})