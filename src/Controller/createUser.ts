import { Request, Response } from "express";
import CreateUser from "../Model/services/createUser.ts";
import { ISignup } from "../Model/interfaces/registers.ts";

export default class Create {
    async handler(request: Request, response: Response): Promise<Response>{
        const {name, email, password, repeatPassword, phone, address}: ISignup = request.body;

           const createdUser = new CreateUser()
           const token = await createdUser.execute({
            name, email, password, repeatPassword, phone, address 
            });

            return response.status(201).json({ 
                status: 201, 
                success: true,
                token: token 
            });
    }
}