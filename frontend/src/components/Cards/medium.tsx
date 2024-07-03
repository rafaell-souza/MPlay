import { Link } from 'react-router-dom';

type SearchProps = {
    id: number;
    title: string;
    image: string;
    onClick?: () => void;
}

export default function MediumCard({ id, title, image, onClick }: SearchProps) {
    return (
        <Link to={`/details/${id}`}
              onClick={onClick}
              className="flex flex-col  w-28 h-48 mb-1 bg-zinc-950 rounded">
            <img src={image} alt={title} className='h-36 w-28 flex shrink-0' />

                <h1 className='text-xs  py-1 mx-1 leading-none'>{title}</h1>
        </Link>
    )
}