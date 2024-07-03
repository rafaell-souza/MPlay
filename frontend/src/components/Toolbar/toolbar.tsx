import { IoSearchOutline } from "react-icons/io5";


export default function Toolbar() {
    return (
        <section className="bg-zinc-950 h-full w-56 fixed flex flex-col items-center top-10 pt-6">

            <form className="flex relative flex justify-between w-[180px]">
                <input type="text" className="rounded-xl px-2 h-7 w-36 bg-zinc-900 text-zinc-300 outline outline-1 outline-zinc-800 placeholder:text-sm text-sm" placeholder="search movie..." />

                <button className="bg-zinc-900 rounded-full p-1 outline outline-zinc-900 hover:opacity-70">
                <IoSearchOutline className="text-xl text-zinc-200" />
                </button>
             
            </form>

            <section>
                <option value="genres" selected></option>
            </section>
            
        </section>
    )
}