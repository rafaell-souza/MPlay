import NavigateTo from "../Button/button";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";


const Header = ({isLogged}: {isLogged: boolean}) => {
    const navigate = useNavigate();
    

    function handleReturnhome(){
        navigate("/");
    }

    function Back() {
        navigate(-1)
    }

    return (
        <header 
        className="border border-zinc-700 w-full h-10 flex justify-between px-6 items-center fixed z-20  bg-zinc-900">
            <h1 onClick={handleReturnhome} className="text-3xl text-white font-bold hover:opacity-90">MO</h1>

            <NavigateTo link="/logout" style="h-8 w-[86px] p-2 flex justify-between items-center bg-zinc-700 font-bold">
                {isLogged ? "logout" : "login"}
                <FaUserCircle className="h-8 w-6" />

            </NavigateTo>
        </header>
    );
}

export default Header;