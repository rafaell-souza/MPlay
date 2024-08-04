import { IoEye, IoEyeOff } from "react-icons/io5";
import Header from '../Header/header';
import { motion, AnimatePresence } from 'framer-motion';
import useRegister from "./useRegister";
import resources from "./resources";
import bg from '../../assets/sign-bg.jpg';

export default function SignIn() {
    const {
        isVisible,
        setIsVisible,
        register,
        resetField,
        handleSubmit,
        errors } = resources();

    const { registerUser, status } = useRegister();

    const formatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let phone = e.target.value.replace(/\D/g, '');
        if (phone.length > 11) {
            phone = phone.slice(0, 11);
        }
        if (phone.length === 11) {
            phone = phone.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (phone.length === 10) {
            phone = phone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return phone;
    }

    return (
        <AnimatePresence>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <Header text='Sign in' link='/signin' />
                <section
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    className='h-[900px] md:h-screen w-screen flex justify-center items-center'>
                    <div className="absolute h-screen  w-full signup-bg"></div>
                    <form
                        onSubmit={handleSubmit(registerUser)}
                        className='w-[480px] md:w-[280px] md:mt-8 px-4 flex flex-col z-20 text-zinc-200'>
                        <h1 className='text-zinc-300 relative text-5xl md:text-2xl mb-5 md:mb-1 font-bold'>SIGN UP</h1>

                        <div className='mt-2 flex flex-col'>
                            <input
                                type="text"
                                placeholder='Name'
                                autoComplete="off"
                                className={`bg-zinc-900 md:bg-zinc-950 py-3 md:py-0 bg-opacity-80 w-full border-b ${errors.name ? "border-red-700" : "border-zinc-800"} outline-none md:px-1 px-2 placeholder:text-2xl text-xl md:text-base placeholder:text-zinc-600 md:placeholder:text-[13px]`}
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
                                        className='text-red-500 mt-[1px] text-[18px] md:text-[10px]'>{errors.name.message}
                                    </motion.span>
                                }
                            </AnimatePresence>
                        </div>

                        <div className={`flex flex-col ${errors.email ? "mt-1" : "mt-2"}`}>
                            <input
                                type="text"
                                placeholder='Email'
                                className={`bg-zinc-900 md:bg-zinc-950 py-3 md:py-0 bg-opacity-80 w-full border-b ${errors.email ? "border-red-700" : "border-zinc-800"} outline-none md:px-1 px-2 placeholder:text-2xl text-xl md:text-base placeholder:text-zinc-600 md:placeholder:text-[13px]`}
                                {...register("email")}
                            />
                            <AnimatePresence>
                                {errors.email ? (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-red-500 mt-[1px] text-[18px] md:text-[10px]"
                                    >
                                        {errors.email.message}
                                    </motion.span>
                                ) : (
                                    status == 409 && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-red-500 mt-[1px] text-[18px] md:text-[10px]"
                                        >
                                            This email is already in use
                                        </motion.span>
                                    )
                                )}
                            </AnimatePresence>

                        </div>

                        <div className={`relative flex flex-col ${errors.password ? "mt-1" : "mt-2"}`}>
                            <input
                                type={isVisible.password ? "text" : "password"}
                                placeholder='Password'
                                className={`bg-zinc-900 md:bg-zinc-950 py-3 md:py-0 bg-opacity-80 w-full border-b ${errors.password ? "border-red-700" : "border-zinc-800"} outline-none md:px-1 px-2 placeholder:text-2xl text-xl md:text-base placeholder:text-zinc-600 md:placeholder:text-[13px]`}
                                {...register("password")}
                            />
                            {isVisible.password ? (
                                <IoEye
                                    onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password })}
                                    className='absolute top-1 text-3xl md:text-base right-2 text-zinc-500' />
                            ) : (
                                <IoEyeOff
                                    onClick={() => setIsVisible({ ...isVisible, password: !isVisible.password })}
                                    className='absolute text-3xl top-3 md:top-1 right-2 md:text-base text-zinc-500' />
                            )}
                            <AnimatePresence>
                                {
                                    errors.password &&
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='text-red-500 mt-[1px] text-[18px] md:text-[10px]'>{errors.password.message}
                                    </motion.span>
                                }
                            </AnimatePresence>
                        </div>

                        <div className={`relative flex flex-col ${errors.repeatPassword ? "mt-1" : "mt-2"}`}>
                            <input
                                type={isVisible.repeatPassword ? "text" : "password"}
                                placeholder='Confirm Password'
                                className={`bg-zinc-900 md:bg-zinc-950 py-3 md:py-0 bg-opacity-80 w-full border-b ${errors.repeatPassword ? "border-red-700" : "border-zinc-800"} outline-none md:px-1 px-2 placeholder:text-2xl text-xl md:text-base placeholder:text-zinc-600 md:placeholder:text-[13px]`}
                                {...register("repeatPassword")}
                            />
                            {isVisible.repeatPassword ? (
                                <IoEye
                                    onClick={() => setIsVisible({ ...isVisible, repeatPassword: !isVisible.repeatPassword })}
                                    className='absolute top-3 text-3xl md:text-base md:top-1 right-2 text-zinc-500' />
                            ) : (
                                <IoEyeOff
                                    onClick={() => setIsVisible({ ...isVisible, repeatPassword: !isVisible.repeatPassword })}
                                    className='absolute text-3xl top-3 md:top-1 right-2 md:text-base text-zinc-500' />
                            )}
                            <AnimatePresence>
                                {
                                    errors.repeatPassword &&
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='text-red-500 mt-[1px] text-[18px] md:text-[10px]'>{errors.repeatPassword.message}
                                    </motion.span>
                                }
                            </AnimatePresence>
                        </div>

                        <div className={`flex flex-col ${errors.phone ? 'mt-1' : 'mt-2'}`}>
                            <div className="flex">
                                <div className={`${errors.phone ? "border-red-700" : "border-zinc-800"} bg-zinc-950 text-zinc-500 py-3 md:py-0 border-b bg-opacity-80 cursor-not-allowed placeholder:text-zinc-600 md:text-base text-xl border-b w-13 outline-none px-3 md:px-1`}>
                                    +55
                                </div>
                                <input
                                    placeholder='(00) 00000-0000'
                                    className={`bg-zinc-900 md:bg-zinc-950 py-3 md:py-0 bg-opacity-80 w-full border-b ${errors.phone ? "border-red-700" : "border-zinc-800"} outline-none md:px-1 px-2 placeholder:text-2xl text-xl md:text-base placeholder:text-zinc-600 md:placeholder:text-[13px]`}
                                    {...register('phone')}
                                    onChange={(e) => {
                                        e.target.value = formatNumber(e);
                                    }}
                                />
                            </div>
                            <AnimatePresence>
                                {errors.phone && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className='text-red-500 mt-[1px] text-[18px] md:text-[10px]'
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
                            className='bg-zinc-800 py-3 md:py-0 md:bg-zinc-950 rounded mx-auto mt-3 hover:bg-opacity-60 py-1 animate duration-150 w-40'>
                            CONFIRM
                        </button>
                    </form>
                </section>
            </motion.section>
        </AnimatePresence>
    );
}
