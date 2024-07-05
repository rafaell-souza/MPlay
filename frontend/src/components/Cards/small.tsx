import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { MovieContext } from '../Context/MovieContext';

type CardProps = {
    id: number;
    poster_path: string;
}

export default function SmallCard({id, poster_path}: CardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const { handleMovieId } = useContext(MovieContext);

    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"
    const navigate = useNavigate();

    const handleImageLoaded = () => {
        setImageLoaded(true);
    }

    function handleClick() {
        navigate(`/details`, { replace: true });
        handleMovieId(id);
    }

    return (
       <div
       className="h-40 w-28 flex shrink-0 hover:opacity-60 mr-[1px] transition-opacity duration-100 ease-in-out"
        onClick={handleClick}>
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
        </div>
    )
}