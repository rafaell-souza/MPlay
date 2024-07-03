import { Link } from 'react-router-dom';

type SearchProps = {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    rate: number;
    genres: string;
    image: string;
    onClick?: () => void;
}

export default function MediumCard({ id, title, release_date, overview, rate, genres, image, onClick }: SearchProps) {
    return (
        <Link to={`/details/${id}`}
              onClick={onClick}
              className="">
            <img src={image} alt={title} />
            <div>
                <h1>{title}</h1>
                <p>{release_date}</p>
                <p>{overview}</p>
                <p>{rate}</p>
                <p>{genres}</p>
            </div>
        </Link>
    )
}