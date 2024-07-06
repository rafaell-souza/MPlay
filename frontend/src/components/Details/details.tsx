import { motion } from "framer-motion";
import SmallCard from "../Cards/small";

type MovieType = {
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
}

type MovieType2 = {
    id: number;
    poster_path: string;
    title: string;
}[]

export default function Details({ data, data2}: {data: MovieType | null, data2: MovieType2 | null}) {
    const baseImageUrl = "https://image.tmdb.org/t/p/original";

    const hours = data && Math.floor(data?.runtime / 60);
    const minutes = data && data?.runtime % 60;

    console.log(data2);

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
                    src={baseImageUrl + data?.poster_path}
                    alt={data?.title} />

                <div className="px-5">
                    <h1 className="font-bold text-2xl">{data?.title}</h1>

                    <div className="flex items-center ">
                        <span className="font-bold">Genres: </span>
                        {
                           data && data.genres && (
                            data?.genres.map((genre) => {
                                return <span key={genre.id} className="ml-2 text-xs rounded-full border px-2 border-zinc-600 hover:bg-zinc-800 py-[1px]">{genre.name}</span>
                            })
                           )
                        }
                    </div>

                        <p className="flex items-end">
                            <span className="font-bold">Rate:</span> 
                            <span className="ml-2">{data?.vote_average.toFixed(1)}</span> 
                        </p>
                        <p>
                            <span className="font-bold">Language:</span> 
                            <span className="ml-2">{data?.original_language}</span>
                        </p>
                        <p>
                            <span className="font-bold">Release:</span> 
                            <span className="ml-2">{data?.release_date}</span>
                        </p>
                        <p>
                            <span className="font-bold">Status:</span>
                            <span className="ml-2">{data?.status}</span>
                        </p>
                        <p>
                            <span className="font-bold">Country:</span>
                            {data?.origin_country && (
                                data?.origin_country.map((country) => {
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
                <p>{data?.overview}</p>

                <h1 className="font-bold text-2xl mt-5">Similar Movies</h1>
                <div className="flex overflow-x-auto scrollable-scrollbar">
                    {
                        data2 && data2.length >0 && (
                           data2.map((movie)=> {
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
                
        </section>
        </motion.div>
    )
}