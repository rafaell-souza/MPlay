import { z } from "zod";

const schema = z.object({
    name: z.string()
        .min(3, {message: "name is 3-50 characters"})
            .max(50, {message: "name is 3-50 characters"})
                .regex(/^[a-zA-Z0-9\s]{3,50}$/, {message: "name is invalid"}),

    email: z.string().email()
        .min(5, {message: "email is 5-250 characters"})
            .max(250, {message: "email is 5-250 characters"})
                .regex(/^[a-zA-Z0-9@.]{5,250}$/, {message: "email is invalid"}),

    password: z.string()
        .min(8, {message: "password is 8-12 characters"})
            .max(12, {message: "password is 8-12 characters"})
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\?\-\+\=_&%$#@!,<>\\]).+$/, {message: "Password does not match {8,12} a-A, 0-9, &$#..."}),

    repeatPassword: z.string(),
        
    phone: z.string().min(15, {message: "phone number is 15 characters"})
        .max(15, {message: "phone number is 15 characteres"})
            .regex(/^(\(\d{2}\)\s{1}\d{5}-\d{4})$/, {message: "phone number is invalid"}),
})
.strict().refine(data => data.password === data.repeatPassword, {
    message: "passwords do not match", path: ["repeatPassword"]});

export default schema;