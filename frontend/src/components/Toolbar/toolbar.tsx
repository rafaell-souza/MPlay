import { IoSearchOutline } from "react-icons/io5";


export default function Toolbar() {
    return (
        <section className="bg-violet-950 h-full w-40 fixed flex flex-col items-center top-10 pt-8">

            <form action="#" className="flex flex-col items-center">
     
              <input type="text" className="relative w-36 rounded px-2 h-6 outline-none text-sm" placeholder="search" />
              
              <div>
              <button className="bg-zinc-800 text-white w-16 px-1 flex justify-between items-center rounded mt-1 text-sm hover:bg-zinc-950">

              <IoSearchOutline className=" pointer-events-none h-5 w-4" />
              search
              </button>
              </div>

            </form>
            
        </section>
    )
}