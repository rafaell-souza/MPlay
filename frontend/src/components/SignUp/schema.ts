import { z } from "zod";

const schema = z.object({
    name: z.string()
        .nonempty({ message: "Name is required." })
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z0-9\s]+$/, { message: "Name can only contain letters, numbers, and spaces." }),

    email: z.string()
        .nonempty({ message: "Email is required." })
        .email({ message: "Please enter a valid email address." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(250, { message: "Email cannot exceed 250 characters." }),

    password: z.string()
        .nonempty({ message: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(12, { message: "Password cannot exceed 12 characters." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: "Password must include uppercase and lowercase letters, a number, and a special character." }),

    repeatPassword: z.string()
        .nonempty({ message: "Confirm your password." }),

    phone: z.string()
        .nonempty({ message: "Phone number is required." })
        .min(15, { message: "Phone number must be exactly 15 characters long." })
        .max(15, { message: "Phone number must be exactly 15 characters long." })
        .regex(/^(\(\d{2}\)\s\d{5}-\d{4})$/, { message: "Phone number must be in the format (XX) XXXXX-XXXX." }),
})
.strict()
.refine(data => data.password === data.repeatPassword, {
    message: "Passwords do not match.",
    path: ["repeatPassword"]
})

export default schema;