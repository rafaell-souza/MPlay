import Header from "../Header/header"
import Toolbar from "../Toolbar/toolbar"
import { useParams } from "react-router";
import useRequest2 from "../../Hooks/useRequest2"
import useRequest from "../../Hooks/useRequest";
import { motion } from "framer-motion"
import SmallCard from "../Cards/small";
import { useRef, useCallback } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Footer from "../Footer/footer";

const key = import.meta.env.VITE_TMDB_KEY;

type Genre = {
    genres: {
        id: number;
        name: string;
    }[]
}

type Results = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

type Movie = {
    results: Results[];
    page: number;
    total_results: number;
    total_pages: number;
}

type Callback = {
    data: Movie;
    loading: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    hasMore: boolean;
}


export default function Genres() {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`;

    const { name } = useParams() as { name: string };

    const { data } = useRequest(genreUrl) as { data: Genre };
    const genre = data.genres?.find((genre) => genre.name === name);
    const { data: movies, loading, setPage, hasMore } = useRequest2("",genre?.id) as Callback;

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        if (movies.page < movies.total_pages) {
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setPage(prev => prev + 1);
                }
            }, { threshold: 1 });
            if (node) observer.current.observe(node);
        }
    }, [loading, movies.page, movies.total_pages])

    return (
        <>
            <Header link="signin" text="sign in" />
            <Toolbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <section className="relative top-10 pb-2 left-[234px] text-white w-[666px]">
                    {
                        loading ? (
                            <div className="h-[350px] items-center flex justify-center">
                                <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-white" />
                                <p className="ml-2">Loading...</p>
                            </div>
                        ) : (
                            <>
                            <h1 className="relative text-xl top-1 border-b border-zinc-800">Genre: {name}</h1>
                            <div className="grid grid-cols-5 mt-1">
                                {
                                    movies?.results?.map((movie, index) => (
                                        movies.results.length === index + 1 ? (
                                            <div key={index}
                                                ref={lastElementRef}
                                            >
                                                <SmallCard
                                                    id={movie.id}
                                                    title={movie.title}
                                                    poster_path={movie.poster_path}
                                                    vote_average={movie.vote_average}
                                                />
                                            </div>
                                        ) : (
                                            <div key={index}>
                                                <SmallCard
                                                    id={movie.id}
                                                    title={movie.title}
                                                    poster_path={movie.poster_path}
                                                    vote_average={movie.vote_average}
                                                />
                                            </div>
                                        )
                                    ))
                                }
                            </div>
                            {
                                hasMore ? (
                                    <div className="h-[50px] items-center flex justify-center">
                                        <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-white" />
                                        <p className="ml-2 text-sm">Loading...</p>
                                    </div>
                                ) : (
                                    <Footer />
                                )
                            }
                            </>
                        )
                    }
                </section>
            </motion.div>
        </>
    )
}