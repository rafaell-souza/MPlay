import jwt from "jsonwebtoken";
import "dotenv/config";

export default class Jwt {
     setJwt(id: string | number): string {
        const secret: string = process.env.SECRET as string;
            const token: string = jwt.sign({ id }, secret, {
                expiresIn: "12h",
            }
        );
        return token;
    }
}