import { IoSearchOutline } from "react-icons/io5";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useRequest from "../../Hooks/useRequest";
import { motion } from "framer-motion";
import { MenuContext } from "../../Context/menuContext";

const key = import.meta.env.VITE_TMDB_KEY;

type Genre = {
    genres: {
        id: number;
        name: string;
    }[];
};

export default function Toolbar() {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`;

    const [inputValue, setInputValue] = useState<string>("");
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.length === 0) return;

        navigate(`/search/${inputValue}`);
        setInputValue("");
    };

    const { data: genres } = useRequest(genreUrl) as { data: Genre };

    const { menu, setMenu } = useContext(MenuContext);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); 
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize); 
        };
    }, []);

    return (
        <motion.section
            initial={{ x: isMobile ? "-100%" : "0" }}
            animate={{ x: menu ? 0 : isMobile ? "-100%" : "0" }}
            transition={{ duration: 0 }}
            className="backdrop-blur bg-opacity-80 md:bg-opacity-100 bg-zinc-950 h-full w-full md:w-56 border-r border-zinc-900 fixed flex flex-col items-center top-10 z-30"
            aria-label="Toolbar"
        >
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                    setMenu(false);
                }}
                className="w-full flex md:mt-0 relative justify-between top-7 px-1"
                role="search"
                aria-label="Search movies"
            >
                <input
                    type="text"
                    className="h-14 md:h-7 w-full text-white border border-red-900 placeholder:text-xl md:placeholder:text-xs text-2xl md:text-xs px-6 md:px-3 outline-none mr-2 md:mr-1 bg-black rounded-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="search movie..."
                    aria-label="Search input"
                />
                <button className="px-3 md:p-1 bg-red-700 hover:opacity-80 mr-1 rounded-full" aria-label="Search">
                    <IoSearchOutline className="text-3xl md:text-xl text-zinc-200" />
                </button>
            </form>

            <ul className="w-full md:grid md:grid-cols-3 flex flex-col relative top-10 px-1">
                {genres.genres?.map((genre) => (
                    <Link to={`/genre/${genre.name}`} key={genre.id}>
                        <li
                            className="text-white rounded bg-zinc-900 md:bg-red-800 md:hover:bg-red-600 mt-1 mr-[3px] text-start pl-5 md:pl-0 md:text-center text-xl md:text-[9px] py-1 font-bold"
                            onClick={() => setMenu(false)}
                        >
                            {genre.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </motion.section>
    );
}
