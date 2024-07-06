import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Toolbar() {

    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(inputValue.length === 0) {
            return;
        }
        window.location.href = `/search/${inputValue}`
        setInputValue("")
    }

    return (
        <section className="bg-zinc-950 h-full w-56 fixed flex flex-col items-center top-10 pt-6">
            <form 
            onSubmit={handleSubmit}
            className="flex relative flex justify-between w-[180px]">
                <input 
                type="text" 
                className="rounded-xl px-2 h-7 w-36 bg-zinc-900 text-zinc-300 outline outline-1 outline-zinc-800 placeholder:text-sm text-sm" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="search movie..." />

                <div>
                <button className="bg-zinc-900 rounded-full p-1 outline outline-zinc-900 hover:opacity-70">
                <IoSearchOutline className="text-xl text-zinc-200" />
                </button>
                </div>
            </form>
        </section>
    )
}