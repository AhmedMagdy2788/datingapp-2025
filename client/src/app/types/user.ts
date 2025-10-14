export interface User {
    id: string;
    userName: string;
    email: string;
    dateOfBirth: Date;
    token: string;
    imageUrl: string | null;
}

export interface LoginCreds{
    email: string;
    password: string;
}
export interface RegisterCreds{
    userName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
}