import prisma from "../../../prisma/prisma.js";
import { BadRequest } from "../errors.ts/status.ts";
import { ISignup } from "../interfaces/registers.ts";
import Jwt from "../Jwt/setJwt.ts";
import Bcrypt from "../encrypt/bcrypt.ts";
import DataValidate from "../DataValidate/handler.ts";


export class CreateUser {
    async execute( user :ISignup ): Promise<string> {

        const { error } = DataValidate.validate(user);
        if (error) {
            throw new BadRequest(error.errors.map((err) => err.message).join(", "));
        }

        const hashedPassword = await new Bcrypt().Hash(user.password);

            const EmailExists = await prisma.account.findFirst({ where: { email: user.email }});
            if (EmailExists) {
                throw new BadRequest("Email already exists!");
            }

            const newRegister = await prisma.account.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                    phone: user.phone,
                    address: user.address
                }
            }) 

            const createAccessToken = new Jwt().setJwt(newRegister.id);
            return createAccessToken;
    }
}