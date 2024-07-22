import { motion } from "framer-motion";
import SmallCard from "../Cards/small";
import ReviewCard from "../Cards/review";
import { useRequest } from "../../Hooks/useRequest";
import { useParams } from "react-router-dom";

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
    production_countries: {name: string}[];
}

type Review = {
    author: string;
    author_details: {avatar_path: string, username: string};
    content: string;
}

type ReviewType = {
    total_pages: number;
    total_results: number;
    results: Review[];
    page: number;
}

type Recommend = {
    results: Movie[];
    page: number
    total_pages: number;
    total_results: number;
}

export default function Details() {
    const { id } = useParams<{ id: string }>();

    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}`;
    const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}`;
    const baseImageUrl = "https://image.tmdb.org/t/p/original";

    const { data: details } = useRequest(detailsUrl) as { data: Movie };
    const { data: recommendations } = useRequest(recommendationsUrl) as { data: Recommend };
    const { data: reviews } = useRequest(reviewsUrl) as { data: ReviewType };

    const hours = details && Math.floor(details?.runtime / 60);
    const minutes = details && details?.runtime % 60;

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        <section className=" relative top-12 left-[230px] text-white text-white w-[670px] flex flex-col">
            <div className="flex mt-3 ">
                <img
                    className="w-[200px] h-[260px] border rounded border-zinc-300 border-dotted"
                    src={baseImageUrl + details?.poster_path}
                    alt={details?.title} />

                <div className="px-5">
                    <h1 className="font-bold text-2xl">{details?.title}</h1>

                    <div className="flex items-center ">
                        <span className="font-bold">Genres: </span>
                        {
                           details && details.genres && (
                            details?.genres.map((genre) => {
                                return <span key={genre.id} className="ml-2 text-xs rounded-full border px-2 border-zinc-600 hover:bg-zinc-800 py-[1px]">{genre.name}</span>
                            })
                           )
                        }
                    </div>

                        <p className="flex items-end">
                            <span className="font-bold">Rate:</span> 
                            <span className="ml-2">{details?.vote_average}</span> 
                        </p>
                        <p>
                            <span className="font-bold">Language:</span> 
                            <span className="ml-2">{details?.original_language}</span>
                        </p>
                        <p>
                            <span className="font-bold">Release:</span> 
                            <span className="ml-2">{details?.release_date}</span>
                        </p>
                        <p>
                            <span className="font-bold">Status:</span>
                            <span className="ml-2">{details?.status}</span>
                        </p>
                        <p>
                            <span className="font-bold">Country:</span>
                            {details?.origin_country && (
                                details?.origin_country.map((country) => {
                                    return <span key={country} className="ml-2">{country}</span>
                                })
                            )}
                        </p>
                        <p>
                            <span className="font-bold">Duration:</span>
                            <span className="ml-2">{hours}h {minutes}min</span>
                        </p>
                </div> 
            </div>

                <h1 className="font-bold text-2xl mt-5">Overview</h1>
                <p>{details?.overview}</p>

                <h2 className="font-bold text-2xl mt-5">Recomended for you</h2>
                <div className="grid grid-cols-5 gap-y-1 scrollable-scrollbar">
                    {
                        recommendations.results && recommendations.results.length > 0 && (
                           recommendations.results.map((movie)=> {
                            return <SmallCard 
                            id={movie.id}
                            poster_path={movie.poster_path}
                            title={movie.title}
                            key={movie.id}
                            />
                           })
                        )
                    }
                </div>

                <h3 className="font-bold text-2xl mt-5">Reviews</h3>
                <div>
                    {
                        reviews.results && reviews.results.length > 0 && (
                            reviews.results.map((review) => {
                                return <ReviewCard
                                author={review.author}
                                avatar={review.author_details.avatar_path}
                                username={review.author_details.username}
                                content={review.content}
                                key={review.author}
                                />
                            })
                        )
                    }
                </div>
        </section>
        </motion.div>
    )
}