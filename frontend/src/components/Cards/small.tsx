import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type CardProps = {
    id: number;
    poster_path: string;
    title: string;
}

export default function SmallCard({id, poster_path, title}: CardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"

    const handleImageLoaded = () => {
        setImageLoaded(true);
    }

    const newTitle = title.replace(/ /g, '-')

    return (
       <Link to={`/details/${id}?movie=${newTitle}`}
       className="h-40 w-28 flex shrink-0 hover:opacity-60 mr-[1px] transition-opacity duration-100 ease-in-out"
        >
        {
            !imageLoaded && (
                <div className="w-full h-full flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="text-white text-4xl animate-spin" />
                </div>
            )}
                <img
                    src={tmdbImageUrl + poster_path}
                    alt="poster"
                    className={`w-full h-full object-cover object-center ${imageLoaded ? 'visible' : 'hidden'}`}
                    onLoad={handleImageLoaded}
                />
        </Link>
    )
}