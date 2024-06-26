import LoginUser from "../Model/services/loginUser.ts";
import { ILogin } from "../Model/interfaces/registers.ts";
import { Request, Response } from "express";

export default class Login {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password }: ILogin = request.body;

        const userLogin = new LoginUser()
        const token = await userLogin.execute({ email, password });

        return response.json({ 
            status: 200,
            suceess: true,
            token: token 
        });
    }
}