import MediumCard from "../Cards/medium";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import PageButton from "../Button/pageButton";
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
        <section className="relative top-12 left-[240px] text-white w-[666px]">
            <div className="grid-cols-5 grid ">
                { loading ? (
                    <div className="ml-64 flex relative top-36 w-28">
                        <AiOutlineLoading3Quarters className="h-7 w-7 mr-1 animate-spin"/>
                        <h1 className="ml-1 ">LOADING...</h1>
                    </div>
                ) : (data && data.results?.length >0 ? (
                        data.results.map((movie) => {
                            return (
                                    <MediumCard
                                    id={movie.id}
                                    title={movie.title}
                                    image={tmdbImageUrl+movie.poster_path}
                                    key={movie.id}
                                    />
                            )
                        })
                    ) : (
                        <p className="text-2xl w-[666px]  flex justify-center relative top-10 font-bold text-zinc-600">No results found</p>
                    ))
                }
            </div>
            <div className="flex justify-center mt-1 w-[650px] mx-auto flex-wrap">
                {
                   !loading && data && data.total_results >0 && (
                    pages.map((page) => {
                        return (
                            <PageButton 
                            key={page} 
                            onClick={() => HandleClick(page)}
                            color={currentPage === page ? "bg-zinc-900" : "bg-zinc-950"}
                            >{page}</PageButton>
                        )
                    })
                   )
                }
            </div>
        </section>
        </motion.div>
    )
}