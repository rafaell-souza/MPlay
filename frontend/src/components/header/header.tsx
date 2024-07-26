import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Header = () => {
    const navigate = useNavigate();
    
    function handleReturnhome(){
        navigate("/");
    }

    return (
        <header 
        className="border border-zinc-700 w-full h-10 flex justify-between px-6 items-center fixed z-50  bg-zinc-900">
            <h1 onClick={handleReturnhome} className="text-3xl text-white font-bold hover:opacity-90">Flix-M</h1>

            <div className="text-white text-[12px] w-44 justify-between flex">
        	<Link to="/login" className="py-1 px-2 rounded border border-red-800 hover:text-red-600">
                NEW ACCOUNT
            </Link>

            <Link to="/sign up" className="rounded px-2 items-center flex bg-red-700 hover:bg-red-900">
                SIGN IN
            </Link>
            </div>
        </header>
    );
}

export default Header;