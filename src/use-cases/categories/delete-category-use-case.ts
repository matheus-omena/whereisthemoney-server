import { CategoriesRepository } from "../../repositories/categories-repository";

export class DeleteCategoryUseCase {    
    constructor(
        private categoriesRepository: CategoriesRepository
    ) {}

    async execute(id: string) {
        const category = await this.categoriesRepository.delete(id)
        return category;
    }
}