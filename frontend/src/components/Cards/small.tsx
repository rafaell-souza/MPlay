import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

    const fixedTitle = title.replace(/ /g, '-')

    return (
         <Link to={`/details/${id}?movie=${fixedTitle}`}
       className="snap-center h-44 w-[128px] flex shrink-0 mr-[6px] justify-end mt-2 text-white relative flex-col"
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
                    className={`w-full h-full absolute object-center object-cover ${imageLoaded ? 'visible' : 'hidden'}`}
                    onLoad={handleImageLoaded}
                />
                <p className='z-10 mb-1 text-[10px] font-bold mx-auto'>{title.length > 15 ? title.slice(0, 15).toUpperCase()+"..." : title.toUpperCase()}
                </p>
                <div className='absolute h-full w-full card-color'></div>
                <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.08 }}
                transition={{ duration: 0.2 }}
                className='absolute h-full 
                w-full bg-white'>
                </motion.div>
        </Link>
    )
}