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
                className='h-[900px] md:h-screen w-screen flex justify-center items-center'
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className='absolute h-screen w-screen z-1 signin-bg'></div>
                <form 
                onSubmit={handleSubmit(SignIn)}
                className='w-[480px] md:w-[280px] md:mt-8 px-4 flex flex-col z-20 text-zinc-200'>
                    <h1 className='text-zinc-300 text-3xl mb-3'>Sign in</h1>
                    <input
                        type="text"
                        placeholder='Email'
                        className={`bg-zinc-900 md:bg-zinc-950 py-3 md:py-0 bg-opacity-80 w-full border-b ${errors.email ? errorColor : "border-zinc-800"} outline-none md:px-1 px-2 placeholder:text-2xl text-xl md:text-base placeholder:text-zinc-600 md:placeholder:text-[13px]`}
                        {...register("email")} />

                    <input
                        type="password"
                        placeholder='Password'
                        className={`bg-zinc-900 md:bg-zinc-950 py-3 md:py-0 bg-opacity-80 w-full border-b ${errors.password ? errorColor : "border-zinc-800"} outline-none md:px-1 px-2 placeholder:text-2xl text-xl mt-1 md:text-base placeholder:text-zinc-600 md:placeholder:text-[13px]`}
                        {...register("password")} />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    className='text-red-500 text-[18px] md:text-[10px] mt-1'>
                        {errors.email?.message || errors.email?.message ? "Email or password is incorrect." : (status === 404 && "Email not registered.")}
                    </motion.p>

                    <button className='text-white py-3 md:py-0 hover:bg-opacity-60 bg-zinc-800 md:bg-zinc-950 mt-4 py-1 w-40 mx-auto'>
                        CONFIRM
                    </button>
                </form>

            </motion.div>
        </>
    )
}