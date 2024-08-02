import schema from "./schema";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useState } from "react";

type FormData = z.infer<typeof schema>;

export default function useLogin() {
    const [status, setStatus] = useState<number | null>(null);
    const navigate = useNavigate();
    const SignIn = async (data: FormData) => {
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
                })

            if (response.ok) {
                console.log('Success:', response);
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/');

            } else {
                console.error('Error:', response);
                setStatus(response.status);
            }

        } catch (error) {
            console.error('Error:', error);
        }
        
    }; return { SignIn, status };
}