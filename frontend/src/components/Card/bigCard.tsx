import MyButton from "../Button/button"

type BigCardProps = {
    image: string;
    title: string;
    id: number;
}

export default function BigCard({ image, title, id}: BigCardProps) {

    const style = "bg-zinc-800 hover:bg-zinc-950 text-white font-bold py-2 px-4 rounded-full mt-1"

    return (
            <>
                <div 
                className="ml-1 h-[340px] text-white w-[720px] flex flex-col items-start justify-end px-5 py-6 rounded flex-shrink-0" 
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                  }}>
                    <h1 className="text-3xl">{title? title : "Novo filme aqui"}</h1>

                    <a href={`details/${id}`} target="_blank">
                    <MyButton text="WATCH NOW" style={style} />
                    </a>
                </div>
            </>
    )
}