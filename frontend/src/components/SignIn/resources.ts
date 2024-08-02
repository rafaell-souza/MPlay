import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './schema';
import { z } from 'zod';

type FormData = z.infer<typeof schema>;

export default function Resources () {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    return { register, handleSubmit, errors };
}