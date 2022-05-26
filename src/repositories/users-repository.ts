export interface UserQueryData {
    name: string;
    email: string;    
}
export interface UserData {
    name: string;
    email: string;
    password: string;
}

export interface UsersRepository {
    find: () => Promise<UserQueryData[]>;
    findById: (id: string) => Promise<UserQueryData | null>;    
    delete: (id: string) => Promise<void>;    
}