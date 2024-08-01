import { z } from 'zod';
import schema from './schema';
import { useNavigate } from 'react-router-dom';

type FormData = z.infer<typeof schema>;

export default function useRegister() {
    const navigate = useNavigate();

    const registerUser = async (data: FormData) => {
        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("token", responseData.token);
                navigate("/");
            } else {
                console.log("Failed to register user!");
            }
        } catch (error) {
            console.error("An error occurred while registering the user:", error);
        }
    };

    return { registerUser };
}
