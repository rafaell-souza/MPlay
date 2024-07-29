import jwt from 'jsonwebtoken';
import "dotenv/config";

export default class Jwt {
    static CreateToken (id: number ): string {
        const secret = process.env.JWT_SECRET as string;
        return jwt.sign({ id }, secret, { expiresIn: '2m' });
    }
}