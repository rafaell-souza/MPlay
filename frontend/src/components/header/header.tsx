import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { RiUser6Line } from "react-icons/ri";

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

    return (
        <header
            className="border border-zinc-700 w-full h-10 flex justify-between px-6 items-center fixed z-50  bg-zinc-900">
            <h1 onClick={handleReturnhome} className="text-3xl text-white font-bold hover:opacity-90">Flix-M</h1>

            <Link
                to={link}
                onClick={handleClick}
                className="py-1 px-2 rounded flex items-center text-white text-[13px] bg-red-700 border border-red-600">
                <RiUser6Line className="text-white text-xl" />
                {text ? text : "TEXT IN"}
            </Link>


        </header>
    );
}

export default Header;