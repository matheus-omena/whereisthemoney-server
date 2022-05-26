export interface AuthQueryData {
    name: string;
    email: string;    
}
export interface AuthData {
    name: string;
    email: string;
    password: string;
}

export interface AuthRepository {    
    create: (data: AuthData) => Promise<AuthData | string>;    
    emailIsAlreadyInUse: (email: string) => Promise<boolean>;
}