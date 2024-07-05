import { motion } from "framer-motion";

type MovieType = {
    poster_path: string;
    genres: number[];
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
        <section className=" relative top-12 left-[230px] text-white text-white w-[670px] h-[300px] flex flex-col">

            <div className="flex mt-6">
                <img
                    className="w-[140px] h-[200px] border border-zinc-300"
                    src={baseImageUrl + data?.poster_path}
                    alt={data?.title} />

                <div className="p-5">
                    <h1 className="font-bold text-2xl">{data?.title}</h1>

                    <p className="text-sm">{data?.overview}</p>
                </div>

            </div>

        </section>
        </motion.div>
    )
}