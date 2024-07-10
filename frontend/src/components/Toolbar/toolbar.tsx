import { IoSearchOutline, IoHome } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const key = import.meta.env.VITE_TMDB_KEY;

type Genre = {
    id: number;
    name: string;
};

export default function Toolbar() {
    const [inputValue, setInputValue] = useState<string>("");
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>("choose genre");

    function handleToggle() {
        setIsVisible(!isVisible);
    }

    function handleSelect(genre: string) {
        setSelectedGenre(genre);
    }

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.length === 0) { return; }

        navigate(`/search/${inputValue}`);
        setInputValue("");
    };


    useEffect(() => {
        async function fetchMovieGenres() {
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`;
            const response = await fetch(url);
            const data = await response.json();
            setMovieGenres(data.genres);
        }
        fetchMovieGenres();
    }, []);

    return (
        <section className="bg-zinc-950 h-full w-56 border-r border-yellow-800 fixed flex flex-col items-start top-10" aria-label="Toolbar">
            <nav className="ml-1 pt-3" role="navigation" aria-label="Main navigation">

                <Link to="/">
                    <button className="flex items-center text-white w-full mt-2" aria-label="Home page">
                        <IoHome className="text-3xl text-zinc-200 border rounded-full p-1 border-yellow-700 hover:bg-yellow-700" />
                        <span className="mx-2 text-sm">Home</span>
                    </button>
                </Link>

                <form onSubmit={handleSubmit} className="flex relative justify-between mt-2" role="search" aria-label="Search movies">
                    <button className="rounded-full p-1 border border-yellow-600 hover:bg-yellow-700" aria-label="Search">
                        <IoSearchOutline className="text-xl text-zinc-200" />
                    </button>

                    <input
                        type="text"
                        className="h-7 w-full bg-zinc-950 text-zinc-300 placeholder:text-xs text-xs mx-2 px-2 border rounded-full border-yellow-700 outline-none"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="search movie..."
                        aria-label="Search input"
                    />
                </form>

                <div className="flex flex-col items-center mt-2 mx-2 text-white">
                    <div onClick={handleToggle} className="flex items-center w-full px-2 py-1 justify-between rounded cursor-pointer border border-yellow-800">
                        <p className="text-sm">{selectedGenre}</p>
                        <IoMdArrowDropdown className={`text-xl transition-transform ${isVisible ? 'rotate-180' : ''}`} />
                    </div>
                    <AnimatePresence>
                    {isVisible && (
                            <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: 184 }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                        className="w-full flex flex-col  overflow-y-auto scroll-genre rounded bg-zinc-950">
                            <ul className="w-full">
                                {movieGenres.map((genre) => (
                                    <Link to={`/genre/${genre.id}`} key={genre.id}>
                                        <li
                                            className="px-2 py-[3px] rounded mt-1 bg-zinc-900 cursor-pointer hover:bg-yellow-700 text-sm text-center"
                                            onClick={() => handleSelect(genre.name)}
                                        >
                                            {genre.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                     </AnimatePresence>
                </div>

            </nav>
        </section>
    );
}
