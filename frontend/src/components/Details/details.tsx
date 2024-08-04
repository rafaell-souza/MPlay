import { GoClock } from "react-icons/go";

import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import useRequest from "../../Hooks/useRequest";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Toolbar from "../Toolbar/toolbar";

const key: string = import.meta.env.VITE_TMDB_KEY;

type Movie = {
    id: number
    poster_path: string;
    genres: { id: number, name: string }[];
    title: string;
    overview: string;
    release_date: string;
    runtime: number;
    
}

type Picture = {
    backdrops: { file_path: string }[];
}

export default function Details() {
    const { id } = useParams<{ id: string }>();

    const pictures = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${key}&language=en-US&include_image_language=en,null`;
    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    const baseImageUrl = "https://image.tmdb.org/t/p/original";

    const { data: picturesData } = useRequest(pictures) as { data: Picture };
    const { data: details } = useRequest(detailsUrl) as { data: Movie };

    const hours = details && Math.floor(details?.runtime / 60);
    const minutes = details && details?.runtime % 60;

    return (
        <>
            <Header link="signin" text="sign in" />
            <Toolbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <section
                    className="p-1 relative top-10 md:left-[230px] text-white text-white md:w-[670px] flex flex-col">
                    <img
                        className="w-full h-full inset-0 absolute rounded object-cover opacity-20"
                        src={baseImageUrl + details?.poster_path}
                        alt="background theme" />

                    <div className="flex top-8 md:top-0 flex-col md:flex-row items-center md:items-start relative">
                        <img
                            className="w-[240px] rounded"
                            src={baseImageUrl + details?.poster_path}
                            alt={details?.title}
                        />

                        <div className="relative h-full flex flex-col scrollable-scrollbar md:px-2 w-full ">

                            <h1 className="font-bold text-3xl text-center md:text-start top-8 md:top-0 relative">{details?.title?.toUpperCase()}</h1>

                            <p className="relative top-8 md:top-0 flex items-center justify-center md:justify-start ">

                                <GoClock className="text-xl mr-1 md:mr-0 md:text-xl text-white" />
                                <span className="ml-1 text-2xl"> {hours} hr {minutes} min</span>
                                <span className="ml-1 text-2xl">- {details?.release_date?.slice(0, 4)}</span>

                            </p>

                            <div className="flex items-center relative md:top-2 top-12 justify-center md:justify-start relative">
                                {
                                    details && details.genres && (
                                        details?.genres.map((genre) => {
                                            return <span key={genre.id} className="text-2xl md:text-xs mr-3 md:mr-1 px-2 py-[1px] rounded md:bg-red-800">{genre.name}</span>
                                        })
                                    )
                                }
                            </div>
                            <p className="relative text-start mt-24 font-bold px-1 md:px-0 text-2xl md:mt-6 md:text-[15px] leading-tight">Overview</p>
                            <p className="relative text-start px-1 md:px-0 text-2xl mt-3 md:mt-2 md:text-[15px] leading-tight">{details?.overview}</p>
                        </div>
                    </div>

                    {
                        picturesData.backdrops?.length > 0 && (
                            <section className=" relative md:mt-8 mt-16 ">
                                <header>
                                    <h1>
                                        {picturesData.backdrops?.length > 0 ? "Pictures" : ""}
                                    </h1>
                                </header>
                                <div className="grid grid-cols-2 md:grid-cols-4 border-b border-t border-red-700 py-2 gap-3 md:gap-0">
                                    {
                                        picturesData && picturesData.backdrops && (
                                            picturesData.backdrops.slice(0, 12).map((picture) => {
                                                return <img
                                                    className="md:w-[160px] md:h-[100px] rounded w-[270px] h-[130px]"
                                                    src={baseImageUrl + picture.file_path}
                                                    alt={details?.title}
                                                    key={picture.file_path}
                                                />
                                            })
                                        )
                                    }
                                </div>
                            </section>
                        )
                    }
                </section>
            </motion.div>
        </>
    )
}