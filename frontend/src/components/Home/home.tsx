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
    mostRated: MovieType[];
    popular: MovieType[];
    upcoming: MovieType[];
};

export default function Home({ playing, mostRated, popular, upcoming }: HomeProps) {
    const topPlaying = playing.slice(0, 5);
    const playingList = playing.slice(5, 20);

    return (
        <>
            <section className="top-10 w-[666px] relative left-[234px] flex flex-col bg-black">
                <div className="flex overflow-x-auto scrollable-scrollbar">
                    {topPlaying.map((movie) => (
                        <BigCard
                            key={movie.id}
                            title={movie.title}
                            image={movie?.backdrop_path}
                            id={movie.id}
                        />
                    ))}
                </div>

                <h1 className="text-xl mt-10 text-white font-bold">PLAYING NOW</h1>
                <div className="flex overflow-x-auto scrollable-scrollbar">
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

                <h2 className="text-xl mt-5 text-white font-bold">TOP RATED</h2>
                <div className="flex overflow-x-auto scrollable-scrollbar">
                    {mostRated.map((movie) => (
                        <SmallCard
                            key={movie.id}
                            id={movie.id}
                            poster_path={movie.poster_path}
                        />
                    ))}
                </div>

                <h3 className="text-xl mt-5 text-white font-bold">POPULAR</h3>
                <div className="flex overflow-x-auto scrollable-scrollbar">
                    {popular.map((movie) => (
                        <SmallCard
                            key={movie.id}
                            id={movie.id}
                            poster_path={movie.poster_path}
                        />
                    ))}
                </div>

                <h4 className="text-xl mt-5 text-white font-bold">UPCOMING</h4>
                <div className="flex overflow-x-auto scrollable-scrollbar">
                    {upcoming.map((movie) => (
                        <SmallCard
                            key={movie.id}
                            id={movie.id}
                            poster_path={movie.poster_path}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
