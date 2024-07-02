import BigCard from "../Cards/big";

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

    return (
        <>
            <section className="top-10 w-[680px] relative left-[227px] bg-red-700">
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
            </section>
        </>
    );
}
