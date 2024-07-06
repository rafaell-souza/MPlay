import { motion } from "framer-motion";

type MovieType = {
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

type DetailsProps = {
    data: MovieType | null;
}

export default function Details({ data }: DetailsProps) {
    const baseImageUrl = "https://image.tmdb.org/t/p/original";

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        >
        <section className=" relative top-12 left-[240px] text-white text-white w-[670px] h-[300px] flex flex-col">
            <div className="flex mt-6">
                <img
                    className="w-[140px] h-[200px] border border-zinc-300"
                    src={baseImageUrl + data?.poster_path}
                    alt={data?.title} />

                <div className="p-5">
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

                    <div className="flex items-center">
                        <p className=""><span className="font-bold">Rate: </span>{data?.vote_average.toFixed(1)}</p>
                    </div>
                </div> 

            </div>
        </section>
        </motion.div>
    )
}