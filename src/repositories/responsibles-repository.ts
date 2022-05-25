export interface ResponsibleData {    
    name: string;
    color: string;
}

export interface ResponsiblesRepository {
    find: () => Promise<ResponsibleData[] | any>;
    findById: (id: string) => Promise<ResponsibleData | any>;
    create: (data: ResponsibleData) => Promise<ResponsibleData | any>;
    delete: (id: string) => Promise<void>;
}