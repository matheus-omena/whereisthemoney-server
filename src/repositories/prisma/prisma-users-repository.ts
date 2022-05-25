import { prisma } from "../../prisma";
import { UserData, UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {    
    async find() {  
        const users = await prisma.user.findMany();
        return users;
    };

    async findById(id: string) {  
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        return user;
    };

    async create({ name, email, password }: UserData) {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        return user;
    };

    async delete(id: string) {
        await prisma.user.delete({
            where: {
                id: id
            }
        })
    };
}