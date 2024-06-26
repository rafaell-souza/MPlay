import { ILogin } from "../interfaces/registers.ts";
import prisma from "../../../prisma/prisma.js";
import { BadRequest } from "../errors.ts/status.ts";
import Bcrypt from "../encrypt/bcrypt.ts";
import Jwt from "../Jwt/setJwt.ts";

export default class LoginUser {
    async execute( user: ILogin ): Promise<string> {
        if(user.email === undefined || user.password === undefined) {
            throw new BadRequest("Email or password is missing!");
        }

        const emailToLowerCase = user.email.toLowerCase();

        const userExists = await prisma.account.findUnique({
        where: {email: emailToLowerCase}});

        if (!userExists) {
            throw new BadRequest("Emai is not registered!");
        }

        const bcrypt = new Bcrypt();
        const passwordMatch = await bcrypt.compare(user.password, userExists.password);
        
        if (!passwordMatch) {
            throw new BadRequest("Password is incorrect!");
        }

        const token =  new Jwt().SetJwt(userExists.id);
        return token;
}}