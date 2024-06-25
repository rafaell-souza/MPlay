export interface ISignup {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    phone: string;
    address: string;
}

export interface ILogin {
    email: string;
    password: string;
}
