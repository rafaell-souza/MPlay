import { useForm } from 'react-hook-form';
import { z } from "zod";
import schema from './schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';

type FormData = z.infer<typeof schema>;

export default function Helper(){
    const [isVisible, setIsVisible] = useState({
        password: false,
        repeatPassword: false
    })

    const {
        register,
        resetField,
        handleSubmit,
        formState: { errors } } = useForm<FormData>({
            resolver: zodResolver(schema),
            mode: 'onTouched',
            defaultValues: {
                name: '',
                email: '',
                password: '',
                repeatPassword: '',
                phone: ''
            }
        });

        return { isVisible, setIsVisible, register, resetField, handleSubmit, errors }
}
