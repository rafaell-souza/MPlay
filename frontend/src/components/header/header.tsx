import NavigateTo from "../Button/button";
import { FaUserCircle } from "react-icons/fa";


const Header = ({isLogged}: {isLogged: boolean}) => {
    return (
        <header 
        className="border border-zinc-700 w-full h-10 flex justify-between px-14 items-center fixed z-20  bg-zinc-900">
            
            <h1 className="text-3xl text-white font-bold">MO</h1>

            <NavigateTo link="/signup" style="h-8 w-[86px] p-2 flex justify-between items-center bg-zinc-800 font-bold">
                {isLogged ? "logout" : "login"}
                <FaUserCircle className="h-8 w-6" />

            </NavigateTo>
        </header>
    );
}

export default Header;