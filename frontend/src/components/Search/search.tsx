import MediumCard from "../Cards/medium";
import PageButton from "../Button/pageButton";

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

export default function Search({ data, loading, changePage }: { data: Movie | null, loading: boolean, changePage: (page: number) => void }) {

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
            <section className="relative top-12 left-[225px] text-white w-[670px] ">

                <div className="grid grid-cols-5">
                    {loading ? (
                        <div className=" flex relative top-36 mx-auto items-center w-[666px] justify-center">
                            <AiOutlineLoading3Quarters className="h-7 w-7 mr-1 animate-spin" />
                            <h1 className="ml-1 ">LOADING...</h1>
                        </div>

                    ) : (data && data.results?.length > 0 ? (
                        data.results.map((movie) => {
                            return (
                                <MediumCard
                                    id={movie.id}
                                    title={movie.title}
                                    image={tmdbImageUrl + movie.poster_path}
                                    key={movie.id}
                                />
                            )
                        })
                    ) : (
                        <p className="text-2xl w-[666px]  flex justify-center relative top-10 font-bold text-zinc-600">No results found</p>
                    ))
                    }
                </div>

                <div className="flex justify-center items-start">
                    {!loading && data && data.total_results > 0 && (
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
