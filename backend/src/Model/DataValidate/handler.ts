import { ILogin, ISignup } from "../interfaces/registers.ts";
import schema from "./schema.ts";

export default class DataValidate {
    static validate(data: ISignup) {
        return schema.safeParse(data);
    }
}

