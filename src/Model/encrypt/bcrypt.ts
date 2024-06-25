import bcrypt from "bcrypt";

export default class Bcrypt {
    async Hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async Compare(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}