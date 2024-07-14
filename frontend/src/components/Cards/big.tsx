import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdStarRate } from "react-icons/md";

type BigCardProps = {
    title: string;
    overview: string;
    image: string;
    id: number;
    onClick?: () => void;
    release_date: string;
    vote_average: number;
}

export default function BigCard({ title, image, id, overview, release_date, vote_average, onClick }: BigCardProps) {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/original";
    const [imageLoaded, setImageLoaded] = useState(false);

    const newTitle = title.replace(/ /g, '-')

    const handleImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <div
            className="relative w-full h-[360px] flex shrink-0 flex flex-col relative justify-end p-5 cursor-grab"
            onClick={onClick}>
            {!imageLoaded && (
                <div className="w-full h-full flex items-center justify-center absolute inset-0 ">
                    <AiOutlineLoading3Quarters className="text-white text-4xl animate-spin" />
                </div>
            )}

            <img
                src={tmdbImageUrl + image}
                alt={title}
                className={`w-full h-full object-cover object-center absolute inset-0 ${imageLoaded ? 'visible' : 'hidden'}`}
                onLoad={handleImageLoaded}
            />
            <div className='inset-0 absolute w-full h-full bigcard-color'></div>
            <div className='inset-0 absolute w-full h-full bigcard-color2'></div>

            <h1 className="text-white text-3xl font-bold  relative z-20">{title}</h1>

            <div className='text-white z-20 flex'>
                    <p className='text-white z-20 text-md mr-2'>{release_date}</p>
                <div className='flex mb-6 items-center'>
                    <MdStarRate className='text-yellow-400 text-xl mr-1' />
                    <p className='text-white z-20 text-sm relative top-[2px]'>{vote_average.toFixed(1)}</p>
                </div>
            </div>

            <p className='text-white z-20 text-md mb-2 w-[350px] leading-tight'>{overview.length >= 120 ? overview.slice(0, 120) + "..." : overview}</p>

            <Link to={`/details/${id}?movie=${newTitle}`}>
                <button
                    className="w-28 p-2 mb-5 relative z-20 bg-zinc-900 text-white text-center rounded cursor-pointer hover:bg-zinc-950 transition ease-in-out duration-200 text-xl"
                >
                    More Info
                </button>
            </Link>
        </div>
    );
}
