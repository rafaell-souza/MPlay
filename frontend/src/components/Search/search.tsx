import SmallCard from "../Cards/small";
import PageButton from "../Button/pageButton";

import { FaTwitter } from "react-icons/fa";
import { VscGithubAlt } from "react-icons/vsc";
import { FaLinkedinIn } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

import { motion } from "framer-motion";
import { useState } from "react";

type Movie = {
    results: {
        id: number,
        poster_path: string,
        title: string,
    }[];
    page: number;
    total_results: number;
    total_pages: number;
}

export default function Search({ data, loading, changePage, text }: { data: Movie | null, loading: boolean, changePage: (page: number) => void, text: string }) {

    const [currentPage, setCurrentPage] = useState(1)

    function HandleClick(page: number) {
        setCurrentPage(page)
        changePage(page)
    }

    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"

    const pages = [];
    if (data && data.total_results > 0) {
        for (let i = 1; i <= data.total_pages; i++) {
            pages.push(i)
        }
    }

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

                            <div className="flex flex-col items-center h-48 mt-6 border-r border-l border-zinc-800 rounded-lg">
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
                                <h1 className="mx-auto font-bold mt-3 border-b border-zinc-500 text-zinc-300">About this website</h1>
                                <p className="mt-2 text-zinc-300 w-[450px] text-sm text-center">
                                    Website created for technical practice only. All data is provided by TMDB API. For more info about this or other projects, check my <span className="text-blue-500"><a href="#">portfolio</a></span> or the social media links above.
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

                <div className="flex justify-center items-start">
                    {!loading && data && data.total_results > 0 && pages.length > 1 && (
                        <>
                            <FaCaretLeft
                                onClick={() => currentPage > 1 && HandleClick(currentPage - 1)}
                                className={`h-10 w-8 ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`}
                            />
                            <div className="flex items-center overflow-x-auto scrollable-scrollbar mx-2" style={{ maxWidth: 'calc(100% - 64px)' }}>
                                {pages.map((page) => (
                                    <PageButton
                                        key={page}
                                        onClick={() => HandleClick(page)}
                                        color={currentPage === page ? "bg-zinc-900" : "bg-zinc-950"}
                                    >
                                        {page}
                                    </PageButton>
                                ))}
                            </div>
                            <FaCaretRight
                                onClick={() => data && currentPage < data.total_pages && HandleClick(currentPage + 1)}
                                className={`h-10 w-8 ${data && currentPage === data.total_pages ? 'text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`}
                            />
                        </>
                    )}
                </div>
            </section>
        </motion.div>
    )
}
