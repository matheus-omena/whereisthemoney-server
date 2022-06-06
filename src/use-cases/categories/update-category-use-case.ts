import { CategoriesRepository } from "../../repositories/categories-repository";

export interface UpdateCategoryUseCaseRequest {
    name: string;
}

export class UpdateCategoryUseCase {
    constructor(
        private categoriesRepository: CategoriesRepository
    ) { }

    async execute(id: string, request: UpdateCategoryUseCaseRequest) {
        const category = await this.categoriesRepository.update(id, request)

        return category;
    }
}