import Header from "./components/header/header"
import Toolbar from "./components/Toolbar/toolbar"
import AppRoutes from "./Routes/AppRoutes"
import { BrowserRouter } from "react-router-dom"

export default function App() {
    return (
        <>
        <BrowserRouter>
            <Header />
            <Toolbar />
            <AppRoutes />
        </ BrowserRouter>
        </>
    )
}