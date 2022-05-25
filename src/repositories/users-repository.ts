export interface UserData {
    name: string;
    email: string;
    password: string;
}

export interface UsersRepository {
    find: () => Promise<UserData[]>;
    findById: (id: string) => Promise<UserData | null>;
    create: (data: UserData) => Promise<UserData>;
    delete: (id: string) => Promise<void>;
}