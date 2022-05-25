import { CategoriesRepository } from "../../repositories/categories-repository";

export interface CreateCategoryUseCaseRequest {
    name: string;    
}

export class CreateCategoryUseCase {    
    constructor(
        private categoriesRepository: CategoriesRepository
    ) {}

    async execute(request: CreateCategoryUseCaseRequest) {
        const { name } = request;        

        const category = await this.categoriesRepository.create({ name })

        return category;
    }
}