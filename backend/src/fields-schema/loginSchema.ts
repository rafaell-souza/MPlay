import { z } from "zod";

const schema = z.object({
    email: z.string().email()
    .min(5, {message: "email is 5-250 characters"})
        .max(250, {message: "email is 5-250 characters"})
            .regex(/^[a-zA-Z0-9@.]{5,250}$/, {message: "email is invalid"}),

password: z.string()
    .min(8, {message: "password is 8-12 characters"})
        .max(12, {message: "password is 8-12 characters"})
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\?\-\+\=_&%$#@!,<>\\]).+$/, {message: "Password does not match {8,12} a-A, 0-9, &$#..."}),
})

export default schema;