import SmallCard from "../Cards/small";

import { FaTwitter } from "react-icons/fa";
import { VscGithubAlt } from "react-icons/vsc";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

type Results = {
    id: number,
    poster_path: string,
    title: string,
}

type Movie = {
    results: Results[];
    page: number;
    total_results: number;
}

export default function Search({ data, loading, text }: { data: Movie | null, loading: boolean, text: string | undefined }) {

    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <section className="relative top-10 left-[234px] text-white w-[666px]">

                <div className="grid grid-cols-5">
                    {loading ? (
                        <div className=" flex relative top-36 mx-auto items-center w-[666px] justify-center">
                            <AiOutlineLoading3Quarters className="h-7 w-7 mr-1 animate-spin" />
                            <h1 className="ml-1 ">LOADING...</h1>
                        </div>

                    ) : (data && data.results?.length > 0 ? (
                        data.results.map((movie) => {
                            return (
                                <SmallCard
                                    id={movie.id}
                                    title={movie.title}
                                    poster_path={tmdbImageUrl + movie.poster_path}
                                    key={movie.id}
                                />
                            )
                        })
                    ) : (
                        <section className="w-[666px] mt-5 flex flex-col">
                            <p className="py-2 text-md font-bold text-zinc-300 border-b border-zinc-900">SEARCHING FOR: {text}</p>

                            <div className="flex flex-col items-center h-48 mt-6">
                                <ul className="flex h-8 mt-6 w-32 justify-between">
                                    <a target="_blank" href="https://github.com/rafaell-souza">
                                        <li>
                                            <VscGithubAlt className="text-3xl rounded-lg p-1 bg-red-700" />
                                        </li>
                                    </a>
                                    <div className="border-r border-zinc-700"></div>
                                    <a target="_blank" href="https://x.com/rafaSouza44">
                                        <li>
                                            <FaTwitter className="text-3xl p-1 rounded-lg bg-red-700" />
                                        </li>
                                    </a>
                                    <div className="border-r border-zinc-700"></div>
                                    <a target="_blank" href="https://www.linkedin.com/in/rafael-set/">
                                        <li>
                                            <FaLinkedinIn className="text-3xl p-1 rounded-lg bg-red-700" />
                                        </li>
                                    </a>
                                </ul>
                                <h1 className="mx-auto font-bold mt-3 border-b border-zinc-500 text-zinc-300">About the website</h1>
                                <p className="mt-2 text-zinc-300 w-[450px] text-sm text-center">
                                    Website created for technical practice only. All data is provided by TMDB API. For more information about this project or others, check my <span className="text-blue-500"><a href="#">portfolio</a></span> or the social media links above.
                                </p>
                                <p className="text-sm mt-3">
                                    Contact: <span className="text-blue-500"><a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=rafaellsza03@gmail.com">rafaellsza03@gmail.com</a>
                                    </span>
                                </p>
                            </div>
                        </section>
                    ))
                    }
                </div>
            </section>
        </motion.div>
    )
}
