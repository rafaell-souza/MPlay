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

    const newTitle = title.replace(/ /g, '-')

    return (
      <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.1 }}
      > 
         <Link to={`/details/${id}?movie=${newTitle}`}
       className="h-44 w-[130px] flex shrink-0 mr-[6px] flex items-end text-white text-xs rounded-lg relative border border-[#2f2f2f]"
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
                    className={`w-full h-full absolute object-center object-cover ${imageLoaded ? 'visible' : 'hidden'} rounded-lg`}
                    onLoad={handleImageLoaded}
                />
                <p className='z-10 mb-1 text-[10px] font-bold mx-auto'>{title.length > 15 ? title.slice(0, 15).toUpperCase()+"..." : title.toUpperCase()}
                </p>
                <div className='absolute h-full w-full card-color rounded-lg'></div>
        </Link>
      </motion.div>
    )
}