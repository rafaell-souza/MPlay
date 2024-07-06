import Header from "./components/header/header"
import Toolbar from "./components/Toolbar/toolbar"
import AppRoutes from "./Routes/AppRoutes"
import { BrowserRouter } from "react-router-dom"
import { motion } from "framer-motion";

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
                    <Header />
                    <Toolbar />
                    <AppRoutes />
                </motion.div>
        </ BrowserRouter>
        </>
    )
}