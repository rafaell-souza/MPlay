import { IoSearchOutline, IoHome, IoMenu } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { useState } from "react";

export default function Toolbar() {
    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (inputValue.length === 0) {
            return;
        }
        window.location.href = `/search/${inputValue}`;
        setInputValue("");
    };

    return (
        <section className="bg-zinc-950 h-full w-56 border-r border-yellow-800 fixed flex flex-col items-start top-10" aria-label="Toolbar">
            <nav className="ml-1 pt-3" role="navigation" aria-label="Main navigation">
            <button className="flex items-center text-white w-full mt-2" aria-label="Home page">
                    <IoHome className="text-3xl text-zinc-200 border rounded-full p-1 border-yellow-700 hover:bg-yellow-700" />
                    <span className="mx-2 text-sm">Home</span>
                </button>
                <button className="flex items-center text-white w-full mt-2" aria-label="Genres">
                    <BiSolidCategoryAlt className="text-3xl text-zinc-200 border rounded-full border-yellow-700 p-1 hover:bg-yellow-700" />
                    <span className="mx-2 text-sm">Genres</span>
                </button>
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
            </nav>
        </section>
    );
}
