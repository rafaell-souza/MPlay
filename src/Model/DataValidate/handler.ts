import schema from "./schema.ts";

interface CheckData {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

export default class DataValidate {
    static validate(data: CheckData) {
        return schema.safeParse(data);
    }
}