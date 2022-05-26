import { prisma } from "../../prisma";
import { UserData, UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async find() {
        const users = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
            }
        });
        return users;
    };

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                email: true,
            }
        });

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