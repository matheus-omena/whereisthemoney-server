import { CategoriesRepository } from "../../repositories/categories-repository";

export class FindCategoryByIdUseCase {    
    constructor(
        private categoriesRepository: CategoriesRepository
    ) {}

    async execute(id: string) {
        const category = await this.categoriesRepository.findById(id)
        return category;
    }
}