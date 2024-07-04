import Header from "./components/header/header"
import Toolbar from "./components/Toolbar/toolbar"
import AppRoutes from "./Routes/AppRoutes"
import { BrowserRouter } from "react-router-dom"
import { ImputProvider } from "./components/Context/inputContext"

export default function App() {
    return (
        <>
        <BrowserRouter>
            <ImputProvider>
                <Header />
                <Toolbar />
                <AppRoutes />
            </ImputProvider>
        </ BrowserRouter>
        </>
    )
}