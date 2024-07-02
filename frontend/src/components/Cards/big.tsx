import { Link } from 'react-router-dom';

type BigCardProps = {
    title: string;
    image: string;
    id: number;
}

export default function bigCard({ title, image, id }: BigCardProps) {

    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"

    return (
        <>
            <div className="w-full h-[342px] flex shrink-0 flex flex-col justify-end p-5" style={{
                backgroundImage: `url(${tmdbImageUrl+image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>

                <h1 className='text-white text-2xl font-bold mb-2'>{title}</h1>
                
                <Link to={`/details/${id}`} className="text-white bg-violet-950 w-32 p-3 rounded-lg flex justify-center mb-5 hover:opacity-70 shadow shadow-black ">
                WATCH NOW
                </Link>

            </div>
        </>
    )
}