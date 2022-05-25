import { CategoriesRepository } from "../../repositories/categories-repository";

export class FindCategoriesUseCase {    
    constructor(
        private categoriesRepository: CategoriesRepository
    ) {}

    async execute() {
        const category = await this.categoriesRepository.find()
        return category;
    }
}