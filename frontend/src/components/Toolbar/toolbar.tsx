import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useRequest from "../../Hooks/useRequest";

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

    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.length === 0) return;

        navigate(`/search/${inputValue}`);
        setInputValue("");
    };

    const { data: genres } = useRequest(genreUrl) as { data: Genre };

    return (
        <section
            className="bg-zinc-950 h-full w-56 border-r border-zinc-900 fixed flex flex-col items-center top-10" aria-label="Toolbar">

            <form
                onSubmit={handleSubmit}
                className="w-full flex relative justify-between top-7 px-1"
                role="search"
                aria-label="Search movies">

                <input
                    type="text"
                    className="h-7 w-full text-white border border-red-900 placeholder:text-xs text-xs px-3 outline-none mr-1 bg-black rounded-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="search movie..."
                    aria-label="Search input"
                />

                <button className="p-1 bg-red-700 hover:opacity-80 mr-1 rounded-full" aria-label="Search">
                    <IoSearchOutline className="text-xl text-zinc-200" />
                </button>
            </form>

            <ul className="w-full grid grid-cols-3  relative top-10 px-1">
                {
                    genres.genres?.map((genre) => (
                        <Link to={`/genre/${genre.name}`} key={genre.id}>
                            <li
                                className="text-white rounded bg-red-800 hover:bg-red-600 mt-1 mr-[3px] text-center text-[9px] py-1 font-bold"
                            >
                                {genre.name}
                            </li>
                        </Link>
                    ))}
            </ul>
        </section>
    );
}
