export interface ISignup {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface ILogin {
    email: string;
    password: string;
}