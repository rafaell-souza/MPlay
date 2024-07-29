import Prisma from "../../prisma/client.ts";
import Register from "../interface/register.ts";
import Bcrypt from "../encrypt/bcrypt.ts";
import Jwt from "../auth/token.ts";
import schema from "../fields-schema/schema.ts";
import { BadRequest, Conflict } from "../helpers/statusCodes.ts";

export default class CreateUserService {
    static async execute(data: Register): Promise<string> {
        const result = schema.safeParse(data);
        if (!result.success) {
        throw new BadRequest(result.error.errors.map((err) => err.message).join(", "));
        };

        const email = data.email.toLowerCase();

        const EmailExists = await Prisma.user.findFirst({
            where: { email: email }
        });

        if (EmailExists) {
            throw new Conflict("Email already exists!");
        }

        const hashedPassword = await Bcrypt.hash(data.password);

        const newUser = await Prisma.user.create({
            data: {
                name: data.name,
                email: email,
                password: hashedPassword,
                phone: data.phone,
            }
        });
        return Jwt.CreateToken(newUser.id);
    }
}