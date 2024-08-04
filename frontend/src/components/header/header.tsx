import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { RiUser6Line } from "react-icons/ri";
import { MenuContext } from "../../Context/menuContext";
import { useContext } from "react";
import { IoMenu } from "react-icons/io5";

type HeaderProps = {
    text: string;
    link: string;
    handleClick?: () => void;
}

const Header = ({ text, link, handleClick }: HeaderProps) => {
    const navigate = useNavigate();

    function handleReturnhome() {
        navigate("/");
    }

    const { setMenu, menu } = useContext(MenuContext);

    return (
        <header
            className="border border-zinc-700 w-full h-16 md:h-10 flex justify-between px-1 md:px-6 items-center fixed z-50  bg-zinc-900">
            <IoMenu
                onClick={() => setMenu(!menu)}
                className="text-6xl text-white cursor-pointer md:hidden" />
            <h1 onClick={handleReturnhome} className="text-3xl text-white font-bold hover:opacity-70">CNA</h1>
    
            <Link
                to={link}
                onClick={handleClick}
                className="py-3 md:py-1 px-7 md:px-2 rounded flex items-center text-white text-[13px] bg-red-700 border border-red-600 hover:bg-opacity-80">
                <RiUser6Line className="text-white text-xl" />
                {text}
            </Link>


        </header>
    );
}

export default Header;