import prisma from "../../../prisma/prisma.js";
import { BadRequest } from "../errors.ts/status.ts";
import { ISignup } from "../interfaces/registers.ts";
import Jwt from "../Jwt/setJwt.ts";

export class CreateUser {
    async execute( user :ISignup ): Promise<string> {

            const EmailExists = await prisma.account.findFirst({ where: { email: user.email }});
            if (EmailExists) {
                throw new BadRequest("Email already exists!");
            }

            const newRegister = await prisma.account.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            }) 

            const createAccessToken = new Jwt().setJwt(newRegister.id);
            return createAccessToken;
    }
}