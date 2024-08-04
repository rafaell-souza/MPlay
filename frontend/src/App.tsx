import AppRoutes from "./Routes/AppRoutes.tsx"
import { BrowserRouter } from "react-router-dom"
import { motion } from "framer-motion";
import MenuProvider from "./Context/menuContext.tsx";

export default function App() {
    return (
        <>
        <BrowserRouter>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                    <MenuProvider>
                        <AppRoutes />
                    </MenuProvider>
                </motion.div>
        </ BrowserRouter>
        </>
    )
}