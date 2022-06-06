export interface CategoryData {    
    name: string;    
}

export interface CategoriesRepository {
    find: () => Promise<CategoryData[] | any>;
    findById: (id: string) => Promise<CategoryData | any>;
    create: (data: CategoryData) => Promise<CategoryData | any>;
    update: (id: string, data: CategoryData) => Promise<CategoryData | any>;
    delete: (id: string) => Promise<void>;
}