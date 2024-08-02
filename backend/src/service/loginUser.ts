import LoginInterface from "../interface/login.ts";
import Prisma from "../../prisma/client.ts";
import Bcrypt from "../encrypt/bcrypt.ts";
import schema from '../fields-schema/loginSchema.ts';
import { BadRequest, NotFound } from "../helpers/statusCodes.ts";

export default class LoginService {
    static async execute(login: LoginInterface): Promise<void> {
        const testSchema = schema.safeParse(login);
        if (!testSchema.success) {
            throw new BadRequest(testSchema.error.errors.map((err) => err.message).join(", "));
        }
        const email = login.email.toLowerCase();

        const userData = await Prisma.user.findFirst({
            where: { email: email }
        });
        if (!userData) {
            throw new NotFound("User not Registered");
        }

        const passwordMatch = await Bcrypt.compare(login.password, userData.password);
        if (!passwordMatch) {
            throw new BadRequest("Invalid Password");
        }
        
        return;
    }
}