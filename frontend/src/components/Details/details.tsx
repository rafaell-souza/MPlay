import { motion } from "framer-motion";
import useRequest from "../../Hooks/useRequest";
import { useParams } from "react-router-dom";
import { GoClock } from "react-icons/go";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Toolbar from "../Toolbar/toolbar";

const key: string = import.meta.env.VITE_TMDB_KEY;

type Movie = {
    id: number
    poster_path: string;
    genres: { id: number, name: string }[];
    vote_average: number;
    title: string;
    original_language: string;
    overview: string;
    release_date: string;
    origin_country: string[];
    status: string;
    runtime: number;
    production_countries: { name: string }[];
    production_companies: { name: string }[];
    tagline: string;
}

type Picture = {
    backdrops: { file_path: string }[];
}

type Video = {
    results: { key: string }[];
}

export default function Details() {
    const { id } = useParams<{ id: string }>();

    const pictures = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${key}&language=en-US&include_image_language=en,null`;
    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`;
    const baseImageUrl = "https://image.tmdb.org/t/p/original";

    const { data: picturesData } = useRequest(pictures) as { data: Picture };
    const { data: details } = useRequest(detailsUrl) as { data: Movie };
    const { data: videos } = useRequest(videosUrl) as { data: Video };

    const hours = details && Math.floor(details?.runtime / 60);
    const minutes = details && details?.runtime % 60;

    return (
        <>
            <Header />
            <Toolbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <section
                    className="p-1 relative top-12 left-[230px] text-white text-white w-[670px] flex flex-col">
                    <img
                        className="w-full h-full inset-0 absolute rounded object-cover opacity-20"
                        src={baseImageUrl + details?.poster_path}
                        alt="background theme" />

                    <div className="flex relative">
                        <img
                            className="w-[240px] h-full rounded"
                            src={baseImageUrl + details?.poster_path}
                            alt={details?.title}
                        />

                        <div className="overflow-y-auto relative scrollable-scrollbar px-2 w-full">
                            <h1 className="font-bold text-xl">{details?.title?.toUpperCase()}</h1>

                            <p className="flex items-center">
                                <GoClock className="text-sm text-white" />
                                <span className="ml-1 text-sm"> {hours} hr {minutes} min</span>
                                <span className="ml-1 text-[14px]">- {details?.release_date?.slice(0, 4)}</span>
                            </p>

                            <div className="flex items-center mt-2">
                                {
                                    details && details.genres && (
                                        details?.genres.map((genre) => {
                                            return <span key={genre.id} className="text-xs mr-1 px-2 py-[1px] rounded bg-red-800">{genre.name}</span>
                                        })
                                    )
                                }
                            </div>
                            <p className="relative top-2 text-[13px] leading-tight">{details?.overview}</p>
                        </div>
                    </div>

                    {
                        picturesData.backdrops?.length > 0 && (
                            <section className="mb-6 relative top-5 h-[145px]">
                                <header>
                                    <h1>
                                        {picturesData.backdrops?.length > 0 ? "Pictures" : ""}
                                    </h1>
                                </header>
                                <div className="grid grid-cols-4 border-b border-t border-red-700 py-2">
                                    {
                                        picturesData && picturesData.backdrops && (
                                            picturesData.backdrops.slice(0, 4).map((picture) => {
                                                return <img
                                                    className="w-[160px] h-[100px] rounded"
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
                    <Footer />
                </section>
            </motion.div>
        </>
    )
}