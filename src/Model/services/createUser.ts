import prisma from "../../../prisma/prisma.js";
import { BadRequest } from "../errors.ts/status.ts";
import { ISignup } from "../interfaces/registers.ts";
import Jwt from "../Jwt/setJwt.ts";
import Bcrypt from "../encrypt/bcrypt.ts";
import DataValidate from "../DataValidate/handler.ts";

export default class CreateUser {
    async execute( user :ISignup ): Promise<string> {
        const requiredFields: (keyof ISignup)[] = ["name", "email", "password", "phone", "address"];

        requiredFields.forEach((field) => {
            if (!user[field]) {
                throw new BadRequest(`${field} is required!`);
            }
        })

        const { error } = DataValidate.validate(user);
        if (error) {
            throw new BadRequest(error.errors.map((err) => err.message).join(", "));
        }

        const hashedPassword = await new Bcrypt().hash(user.password);

        const emailToLowerCase = user.email.toLowerCase();
            const EmailExists = await prisma.account.findFirst({ where: { email: emailToLowerCase}});
            if (EmailExists) {
                throw new BadRequest("Email already exists!");
            }

            const newRegister = await prisma.account.create({
                data: {
                    name: user.name,
                    email: emailToLowerCase,
                    password: hashedPassword,
                    phone: user.phone,
                    address: user.address
                }
            }) 

            const createAccessToken = new Jwt().SetJwt(newRegister.id);
            return createAccessToken;
    }
}