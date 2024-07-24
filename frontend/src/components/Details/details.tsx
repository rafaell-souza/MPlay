import { motion } from "framer-motion";
import SmallCard from "../Cards/small";
import { useRequest } from "../../Hooks/useRequest";
import { useParams } from "react-router-dom";
import { GoClock } from "react-icons/go";

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

type Recommend = {
    results: Movie[];
    page: number
    total_pages: number;
    total_results: number;
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <section 
            className="relative top-12 left-[230px] text-white text-white w-[670px] flex flex-col">

                <div className="flex mt-1">
                    <img
                        className="w-[200px] h-[260px] rounded"
                        src={baseImageUrl + details?.poster_path}
                        alt={details?.title} />

                    <div className="px-2 w-[450px]">
                        <h1 className="font-bold text-2xl">{details?.title?.toUpperCase()}</h1>

                        <p className="flex justify-start items-center">
                            <GoClock className="text-sm text-white" />
                            <span className="ml-1 text-sm"> {hours} hr {minutes} min</span>
                        </p>

                        <p className="mt-1 text-[13px] leading-tight">{details?.overview}</p>

                        <div className="flex items-center mt-2">
                            {
                                details && details.genres && (
                                    details?.genres.map((genre) => {
                                        return <span key={genre.id} className="text-xs mr-1 px-2 py-[1px] rounded bg-red-800">{genre.name}</span>
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>

                <section className="relative top-5 h-[145px]">
                    <header>
                        <h1>
                            Pictures
                        </h1>
                    </header>
                <div className="flex border-b border-t border-red-950 py-2">
                    {
                        picturesData && picturesData.backdrops && (
                            picturesData.backdrops.slice(0,4).map((picture) => {
                                return <img
                                    className="w-[164px] h-[100px] rounded mr-1"
                                    src={baseImageUrl + picture.file_path}
                                    alt={details?.title}
                                    key={picture.file_path}
                                />
                            })
                        )
                    }
                </div>
                </section>
            </section>
        </motion.div>
    )
}