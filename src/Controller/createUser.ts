import { Request, Response } from "express";
import { CreateUser } from "../Model/services/createUser.ts";
import { ISignup } from "../Model/interfaces/registers.ts";

export class Create {
    async handler(request: Request, response: Response): Promise<Response>{
        const {username, email, password, repeatPassword}: ISignup = request.body;
            await new CreateUser().execute({ username, email, password, repeatPassword });

            return response.status(201).json({ status: 201, success: true });
    }
}