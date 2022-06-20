import { userSessionId } from "../../auth";
import { prisma } from "../../prisma";
import { ResponsibleData, ResponsiblesRepository } from "../responsibles-repository";

export class PrismaResponsiblesRepository implements ResponsiblesRepository {    
    async find() {  
        const responsibles = await prisma.responsible.findMany({
            select: {
                id: true,
                name: true,
                color: true,
                createdAt: true,                
            }
        });
        return responsibles;
    };

    async findById(id: string) {  
        const responsible = await prisma.responsible.findUnique({
            select: {
                id: true,
                name: true,
                color: true,
                createdAt: true,                
            },
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
                color,
                createdBy: userSessionId
            }
        })

        return responsible;
    };

    async update(id: string, { name, color }: ResponsibleData) {
        const responsible = await prisma.responsible.update({
            where: {
                id: id
            },
            data: {
                name,
                color,                
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