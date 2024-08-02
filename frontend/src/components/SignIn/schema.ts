import { z } from "zod";

const schema = z.object({
  
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
    }
);

export default schema;