import BigCard from "../Cards/big";
import SmallCard from "../Cards/small";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { useRef } from "react";

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

    const scrollPlaying = useRef<HTMLDivElement>(null);
    const scrollMostRated = useRef<HTMLDivElement>(null);
    const scrollPopular = useRef<HTMLDivElement>(null);
    const scrollUpcoming = useRef<HTMLDivElement>(null);

    const scroll = (value: number) => {
        scrollPlaying.current && scrollPlaying.current.scrollBy({ left: value })
    };

    const scroll2 = (value: number) => {
        scrollMostRated.current && scrollMostRated.current.scrollBy({ left: value })
    }

    const scroll3 = (value: number) => {
        scrollPopular.current && scrollPopular.current.scrollBy({ left: value })
    }

    const scroll4 = (value: number) => {
        scrollUpcoming.current && scrollUpcoming.current.scrollBy({ left: value })
    }

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
                <div className="flex justify-between h-40 items-center">
                    <div> <IoMdArrowDropleft
                        onClick={() => scroll(-615)}
                        className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                    <div className="overflow-x-auto flex scrollable-scrollbar" ref={scrollPlaying}>
                        {playingList.map((movie) => {
                            return (
                                <SmallCard
                                    key={movie.id}
                                    id={movie.id}
                                    poster_path={movie.poster_path}
                                    title={movie.title}
                                />
                            )
                        })}
                    </div>
                    <div> <IoMdArrowDropright
                        onClick={() => scroll(615)}
                        className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                </div>


                <h2 className="text-xl mt-5 text-white font-bold">TOP RATED</h2>
                <div className="flex items-center h-40">
                    <div>
                        <IoMdArrowDropleft
                            onClick={() => scroll2(-615)}
                            className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                    <div className="flex overflow-x-auto scrollable-scrollbar" ref={scrollMostRated}>
                        {mostRated.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <div>
                        <IoMdArrowDropright
                            onClick={() => scroll2(615)}
                            className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                </div>


                <h3 className="text-xl mt-5 text-white font-bold">POPULAR</h3>

                <div className="flex items-center h-40">
                    <div>
                        <IoMdArrowDropleft
                            onClick={() => scroll3(-615)}
                            className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                    <div className="flex overflow-x-auto scrollable-scrollbar" ref={scrollPopular}>
                        {popular.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <div>
                        <IoMdArrowDropright
                            onClick={() => scroll3(615)}
                            className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                </div>


                <h4 className="text-xl mt-5 text-white font-bold">UPCOMING</h4>

                <div className="flex items-center h-40">
                    <div>
                        <IoMdArrowDropleft
                            onClick={() => scroll4(-615)}
                            className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                    <div className="flex overflow-x-auto scrollable-scrollbar" ref={scrollUpcoming}>
                        {upcoming.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <div>
                        <IoMdArrowDropright
                            onClick={() => scroll4(615)}
                            className="text-white text-4xl bg-yellow-700 h-[165px] w-7" />
                    </div>
                </div>
            </section>
        </>
    );
}
