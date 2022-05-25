import { prisma } from "../../prisma";
import { ResponsibleData, ResponsiblesRepository } from "../responsibles-repository";

export class PrismaResponsiblesRepository implements ResponsiblesRepository {    
    async find() {  
        const responsibles = await prisma.responsible.findMany();
        return responsibles;
    };

    async findById(id: string) {  
        const responsible = await prisma.responsible.findUnique({
            where: {
                id: id
            }
        });

        return responsible;
    };

    async create({ name, color }: ResponsibleData) {
        const responsible = await prisma.responsible.create({
            data: {
                name,
                color
            }
        })

        return responsible;
    };

    async delete(id: string) {
        await prisma.responsible.delete({
            where: {
                id: id
            }
        })
    };
}