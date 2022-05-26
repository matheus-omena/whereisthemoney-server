import { userSessionId } from "../../auth";
import { prisma } from "../../prisma";
import { CategoriesRepository, CategoryData } from "../categories-repository";

export class PrismaCategoriesRepository implements CategoriesRepository {    
    async find() {  
        const categories = await prisma.expenseCategory.findMany();
        return categories;
    };

    async findById(id: string) {  
        const category = await prisma.expenseCategory.findUnique({
            where: {
                id: id
            }
        });

        return category;
    };

    async create({ name }: CategoryData) {
        const category = await prisma.expenseCategory.create({
            data: {
                name,
                createdBy: userSessionId
            }
        })

        return category;
    };

    async delete(id: string) {
        await prisma.expenseCategory.delete({
            where: {
                id: id
            }
        })
    };
}