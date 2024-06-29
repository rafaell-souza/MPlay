type Movie = {
    image: string;
    id: number;
    };

export default function Card({ image, id }: Movie) {
    return (
        <div className="bg-violet-900 h-54 w-32 flex shrink-0 p-1 text-white hover:opacity-60 justify-center">

            <a href={`details/${id}`}>
            <img src={image} alt={`poster ${id}`} className="h-48" style={{
                backgroundSize: "contain",
            }}/>
            </a>
         
        
        </div>
    )
}