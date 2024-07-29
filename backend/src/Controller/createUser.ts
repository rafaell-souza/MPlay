import { Request, Response } from "express";
import Register from "../interface/register.ts";
import CreateUserService from "../service/createUser.ts";

export default class CreateUser {
    async handle(request: Request, response: Response): Promise<Response> {
        const data: Register = request.body;
            const token = await CreateUserService.execute(data);
                return response.status(201).json({ token: token });
    }
}