import { useNavigate } from "react-router"

type SearchProps = {
    id: number;
    title: string;
    image: string;
}

export default function MediumCard({ id, title, image }: SearchProps) {
    const navigate = useNavigate()

    function onClick() {
        navigate(`/details`, {replace: true})
    }

    return (
        <div
              onClick={onClick}
              className="flex flex-col  w-28 h-[163px] mb-2 bg-zinc-950 rounded transition-opacity hover:opacity-60 ease-in-out duration-200">
            <img src={image} alt={title} className='h-36 w-28 flex shrink-0' />

                <p className=' text-xs leading-none mt-1 flex justify-center'>{title.length > 12? title.slice(0,12)+"...": title}</p>
        </div>
    )
}