import { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type BigCardProps = {
    title: string;
    image: string;
    id: number;
}

export default function BigCard({ title, image, id }: BigCardProps) {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/original";
    const [imageLoaded, setImageLoaded] = useState(false);

    const newTitle = title.replace(/ /g, '-')

    const handleImageLoaded = () => {
        setImageLoaded(true);
    }

    return (
        <Link to={`/details/${id}?movie=${newTitle}`}
        className="w-full h-[360px] flex shrink-0 flex flex-col relative justify-end p-5">
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

            <h1 className="text-white text-xl font-bold mb-2 relative z-20">{title}</h1>
            
            <div
                className="w-32 p-2 mb-5 relative z-20 bg-zinc-900 text-white text-center rounded cursor-pointer hover:bg-zinc-950 transition ease-in-out duration-200"
            >
                WATCH NOW
            </div>
        </Link>
    );
}
