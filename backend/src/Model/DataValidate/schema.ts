import { z } from "zod";

const schema = z.object({
    name: z.string()
        .regex(/^[a-zA-Z\s]{3,50}$/, "name is invalid")
            .min(3, "name is 3-50 characters")
                .max(50, "name is 3-50 characters"),

    email: z.string().email()
        .min(5, "email is 5-250 characters")
            .max(250, "email is 5-250 characters"),

    password: z.string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\?\-\+\=_&%$#@!.,<>\\]).+$/, "password requires uppercase, lowercase and one numbers or special characters.")
            .min(8, "password is 8-12 characters")
                .max(12, "password is 8-12 characters"),

    phone: z.string()
        .regex(/^(\(\d{2}\)\s{1}\d{5}-\d{4})|(\(\d{3}\)\s{1}\d{3}-\d{4})$/
, "phone number is invalid")
    .min(10, "phone number is 10-15 characters")
        .max(15, "phone number is 10-15 characters"),

    address: z.string()
        .min(10, "address is 10-100 characters")
            .max(100, "address is 10-100")
                .regex(/^[a-zA-Z0-9\s\,\.\-\(\)-\/]{10,100}$/, "address is invalid")
})

export default schema;