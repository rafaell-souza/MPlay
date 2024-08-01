import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Header from '../Header/header';
import { motion, AnimatePresence } from 'framer-motion';
import useRegister from "./useRegister";
import Helper from "./hook-form";
import bg from '../../assets/signup-bg.jpg';

export default function SignIn() {
    const { isVisible, setIsVisible, register, resetField, handleSubmit, errors } = Helper();
    const { registerUser } = useRegister();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Header text='Sign in' link='signin' />
            <section
                style={{ backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}
                className='h-screen w-screen flex justify-center items-center'>
                    <div className="absolute h-full w-full signup-bg"></div>
                <form
                    onSubmit={handleSubmit(registerUser)}
                    className='w-[280px] mt-8 px-4 flex flex-col z-20 text-zinc-200'>
                    <h1 className='text-zinc-300 relative text-3xl mb-1 font-bold'>Sign up</h1>

                    <div className='mt-2 flex flex-col'>
                        <input
                            type="text"
                            placeholder='Name'
                            autoComplete="off"
                            className={`bg-zinc-950 bg-opacity-80 w-full border-b ${errors.name ? "border-red-700" : "border-zinc-900"} outline-none px-1 placeholder:text-[13px]`}
                            {...register("name")}
                        />
                        <AnimatePresence>
                            {
                                errors.name &&
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className='text-red-500 mt-[1px] text-[10px]'>{errors.name.message}
                                </motion.span>
                            }
                        </AnimatePresence>
                    </div>

                    <div className={`flex flex-col ${errors.email ? "mt-1" : "mt-2"}`}>
                        <input
                            type="text"
                            placeholder='Email'
                            className={`${errors.email ? "border-red-700" : "border-zinc-900"} bg-zinc-950 w-full outline-none px-1 bg-opacity-80 border-b placeholder:text-[13px]`}
                            {...register("email")}
                        />
                        {
                            <AnimatePresence>
                                {
                                    errors.email &&
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='text-red-500 mt-[1px] text-[10px]'>{errors.email.message}
                                    </motion.span>
                                }
                            </AnimatePresence>
                        }
                    </div>

                    <div className={`relative flex flex-col ${errors.password ? "mt-1" : "mt-2"}`}>
                        <input
                            type={isVisible.password ? "text" : "password"}
                            placeholder='Password'
                            autoComplete="new-password"
                            className={`${errors.password ? "border-red-700" : "border-zinc-900"} bg-zinc-950 w-full placeholder:text-[13px] bg-opacity-80 border-b outline-none pr-7 pl-1`}
                            {...register("password")}
                        />
                        {isVisible.password ? (
                            <IoEye
                                onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password })}
                                className='absolute top-1 right-2 text-zinc-300' />
                        ) : (
                            <IoEyeOff
                                onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password })}
                                className='absolute top-1 right-2 text-zinc-300' />
                        )
                        }
                        {
                            <AnimatePresence>
                                {
                                    errors.password &&
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='text-red-500 mt-[1px] text-[10px]'>{errors.password.message}
                                    </motion.span>
                                }
                            </AnimatePresence>
                        }
                    </div>

                    <div className={`relative flex flex-col ${errors.repeatPassword ? "mt-1" : "mt-2"}`}>
                        <input
                            type={isVisible.repeatPassword ? "text" : "password"}
                            placeholder='Confirm Password'
                            autoComplete="new-password"
                            className={`${errors.repeatPassword ? "border-red-700" : "border-zinc-900"} bg-zinc-950 w-full placeholder:text-[13px] border-b bg-opacity-80 outline-none pl-1 pr-7`}
                            {...register("repeatPassword")}
                        />
                        {
                            isVisible.repeatPassword ? (
                                <IoEye
                                    onClick={() => setIsVisible({ ...isVisible, repeatPassword: !isVisible.repeatPassword })}
                                    className='absolute top-1 right-2 text-zinc-300' />
                            ) : (
                                <IoEyeOff
                                    onClick={() => setIsVisible({ ...isVisible, repeatPassword: !isVisible.repeatPassword })}
                                    className='absolute top-1 right-2 text-zinc-300' />
                            )
                        }
                        {
                            <AnimatePresence>
                                {
                                    errors.repeatPassword &&
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='text-red-500 mt-[1px] text-[10px]'>{errors.repeatPassword.message}
                                    </motion.span>
                                }
                            </AnimatePresence>
                        }
                    </div>



                    <div className={`flex flex-col ${errors.phone ? 'mt-1' : 'mt-2'}`}>
                        <div className="flex">
                            <div className={`${errors.phone ? "border-red-700" : "border-zinc-900"} bg-zinc-950 text-zinc-500 border-b bg-opacity-80 cursor-not-allowed border-b w-13 outline-none px-1`}>
                                +55
                            </div>
                            <input
                                placeholder='Phone'
                                className={`bg-zinc-950 w-full outline-none px-1 placeholder:text-[13px] ${errors.name ? "border-red-700" : "border-zinc-900"} bg-opacity-80 border-b`}
                                {...register('phone')}
                            />

                        </div>
                        <AnimatePresence>
                            {errors.phone && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className='text-red-500 mt-[1px] text-[10px]'
                                >
                                    {errors.phone.message}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type='submit'
                        onClick={() => {
                            errors.password && resetField('password');
                            errors.repeatPassword && resetField('repeatPassword');
                        }}
                        className='bg-red-700 rounded mx-auto mt-3 hover:bg-zinc-950 py-1 w-full animate duration-150'>
                        CONFIRM
                    </button>

                </form>
            </section>
        </motion.div>
    )
}