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
              className="flex flex-col  w-[120px] h-[180px] mb-4 ml-2 bg-zinc-950 rounded transition-opacity hover:opacity-60 ease-in-out duration-200">
            <img src={image} alt={title} className='h-40 w-36 flex ' />

                <p className=' text-xs leading-none mt-1 flex justify-center'>{title.length > 12? title.slice(0,12)+"...": title}</p>
        </div>
    )
}