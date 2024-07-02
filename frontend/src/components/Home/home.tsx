import BigCard from "../Cards/big";
import SmallCard from "../Cards/small";

type MovieType = {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    id: number;
};

type HomeProps = {
    playing: MovieType[];
};

export default function Home({ playing }: HomeProps) {
    const topPlaying = playing.slice(0, 5);
    const playingList = playing.slice(5, 20);

    return (
        <>
            <section className="top-10 w-[666px] relative left-[227px] flex flex-col">

                <div className="flex overflow-x-auto">
                    {topPlaying.map((movie) => (
                        <BigCard
                            key={movie.id}
                            title={movie.title}
                            image={movie?.backdrop_path}
                            id={movie.id}
                        />
                    ))}
                </div>

                <h1 className="text-xl mt-10 text-violet-950 font-bold">PLAYING NOW</h1>

                <div className="flex overflow-x-auto">
                    {playingList.map((movie) => {
                        return (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                            />
                        )
                    })}
                </div>

            </section>
        </>
    );
}
