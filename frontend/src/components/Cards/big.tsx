import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type BigCardProps = {
    title: string;
    image: string;
    id: number;
    onClick: () => void;
}

export default function BigCard({ title, image, id, onClick }: BigCardProps) {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/original";
    const [imageLoaded, setImageLoaded] = useState(false);

    const newTitle = title.replace(/ /g, '-')

    const handleImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <div
        className="w-full h-[360px] flex shrink-0 flex flex-col relative justify-end p-5 cursor-grab" onClick={onClick}>
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

            <h1 className="text-white text-3xl font-bold mb-2 relative z-20">{title}</h1>
            
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
