import { motion } from 'framer-motion';
import bg from "../../assets/sign-bg.jpg"
import Header from '../Header/header';
import Resources from './resources';
import useLogin from './useLogin';

export default function SignIn() {
    const errorColor = "border-red-700";
    const { register, handleSubmit, errors } = Resources();
    const { SignIn, status } = useLogin();

    return (
        <>
            <Header text='Sign up' link='/signup' />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className='h-screen w-screen flex justify-center items-center'
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className='absolute h-screen w-screen z-1 signin-bg'></div>
                <form 
                onSubmit={handleSubmit(SignIn)}
                className='flex flex-col w-[280px] z-20'>
                    <h1 className='text-zinc-300 text-3xl mb-3'>Sign in</h1>
                    <input
                        type="text"
                        placeholder='Email'
                        className={`bg-zinc-950 bg-opacity-80 w-full ${errors.email?.message? errorColor : "border-zinc-800"} border-b outline-none px-1 placeholder:text-[13px] text-white`} 
                        {...register("email")} />

                    <input
                        type="password"
                        placeholder='Password'
                        className={`bg-zinc-950 bg-opacity-80 ${errors.password?.message? errorColor : "border-zinc-800"} w-full border-b outline-none px-1 placeholder:text-[13px] mt-2 text-white`} 
                        {...register("password")} />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    className='text-red-500 text-xs mt-1'>
                        {errors.email?.message || errors.email?.message ? "Email or password is incorrect." : (status === 404 && "Email not registered.")}
                    </motion.p>

                    <button className='text-white hover:bg-opacity-60 bg-zinc-950 mt-4 py-1 w-40 mx-auto'>
                        CONFIRM
                    </button>
                </form>

            </motion.div>
        </>
    )
}