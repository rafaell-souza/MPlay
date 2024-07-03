import MediumCard from "../Cards/medium";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Movie = {
    results: {
        id: number,
        poster_path: string,
        title: string,
    }[];
    total_results: number;
    total_pages: number;
}

export default function Search({ data, loading }: { data: Movie | null, loading: boolean} ) {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/original"
    return (
        <section className="relative top-10 left-[227px] text-white  w-[666px]">
            <div className="grid-cols-5 grid">
                { loading ? (
                    <div className="ml-64 flex relative top-36 w-28">
                        <AiOutlineLoading3Quarters className="h-7 w-7 mr-1 animate-spin"/>
                        <h1 className="ml-1 ">loading...</h1>
                    </div>
                ) : (data && data.results?.length >0 ? (
                        data.results.map((movie) => {
                            return (
                                <MediumCard
                                id={movie.id}
                                title={movie.title}
                                image={tmdbImageUrl+movie.poster_path}
                                key={movie.id}
                                />
                            )
                        })
                    ) : (
                        <p>No results found</p>
                    ))
                }
            </div>
        </section>
    )
}