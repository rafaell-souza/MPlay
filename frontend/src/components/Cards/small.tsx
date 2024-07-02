import { Link } from 'react-router-dom';

type CardProps = {
    id: number;
    poster_path: string;
}

export default function SmallCard({id, poster_path}: CardProps) {

    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"

    return (
       <Link 
       to={`/details/${id}`} 
       style={{
        backgroundImage: `url(${tmdbImageUrl+poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       }}
       className="h-40 w-32 flex shrink-0 bg-blue-500 hover:opacity-70 mr-[1px] transition-opacity duration-200 ease-in-out"
       >
        </Link>
    )
}