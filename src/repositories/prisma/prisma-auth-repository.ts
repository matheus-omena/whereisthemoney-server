import { prisma } from "../../prisma";
import { AuthRepository, AuthData } from "../auth-repository";

export class PrismaAuthRepository implements AuthRepository {
    async find() {
        const users = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
            }
        });
        return users;
    };

    async create({ name, email, password }: AuthData) {
        if (await this.emailIsAlreadyInUse(email)) 
            return "O e-mail já está em uso.";
        else {            
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            })
    
            return user;
        }
            
    };

    async emailIsAlreadyInUse(email: string) {        
        const users = await prisma.user.findMany({
            where: {
                email: email,
            }
        })        

        if (users && users.length > 0)
            return true;
        else
            return false;
    }
}