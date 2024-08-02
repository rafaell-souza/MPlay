import LoginInterface from "../interface/login.ts";
import { Request, Response } from "express";
import LoginService from "../service/loginUser.ts";

export default class Login {
    async handle (request: Request, response: Response) {
        const { email, password } = request.body as LoginInterface;
        const token = await LoginService.execute({ email, password });
        return response.status(200).json({ token });
    }
}