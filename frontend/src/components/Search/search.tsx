import MediumCard from "../Cards/medium";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


type Movie = {
    results: {
        id: number,
        vote_average: number,
        genre_ids: number[],
        overview: string,
        poster_path: string,
        release_date: string,
        title: string,
    }[];
    total_results: number;
    total_pages: number;
}


export default function Search({ data, loading }: { data: Movie | null, loading: boolean} ) {
    return (
        <section className="relative top-10 left-[227px] text-white border w-[666px]">
            <div>
                { loading ? (
                    <AiOutlineLoading3Quarters className=""/>
                ) : (data && data.results?.length >0 ? (
                        data.results.map((movie) => {
                            return (
                                <MediumCard
                                id={movie.id}
                                title={movie.title}
                                release_date={movie.release_date}
                                overview={movie.overview}
                                rate={movie.vote_average}
                                image={movie.poster_path}
                                genres={"undefined"}
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