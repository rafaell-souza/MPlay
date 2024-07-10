import { useRef, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import BigCard from "../Cards/big";
import SmallCard from "../Cards/small";
import Footer from "../Footer/footer";

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

    const [currentSlide, setCurrentSlide] = useState(0);

    const scrollPlaying = useRef<HTMLDivElement>(null);
    const scrollMostRated = useRef<HTMLDivElement>(null);
    const scrollPopular = useRef<HTMLDivElement>(null);
    const scrollUpcoming = useRef<HTMLDivElement>(null);

    const scroll = (value: number, ref: React.RefObject<HTMLDivElement>) => {
        ref.current && ref.current.scrollBy({ left: value });
    };

    const handleSlide = (number: number) => {
        setCurrentSlide(number);
        alert(`You clicked on slide number ${currentSlide}`)
    }

    return (
        <section className="top-10 w-[666px] relative left-[234px] flex flex-col bg-black">
            <div className="flex overflow-x-auto scrollable-scrollbar">
                {topPlaying.map((movie, index) => (
                    <BigCard
                        key={movie.id}
                        title={movie.title}
                        image={movie?.backdrop_path}
                        id={movie.id}
                        onClick={() => { handleSlide(index) }}
                    />
                ))}
            </div>

            <section>
                <header>
                    <h1 className="text-xl mt-10 text-white font-bold">PLAYING NOW</h1>
                </header>
                <div className="flex justify-between h-40 items-center">
                    <IoMdArrowDropleft
                        onClick={() => scroll(-615, scrollPlaying)}
                        className="text-white text-4xl h-[165px] w-20 rounded bg-zinc-900 cursor-pointer"
                    />
                    <div className="overflow-x-auto flex scrollable-scrollbar" ref={scrollPlaying}>
                        {playingList.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <IoMdArrowDropright
                        onClick={() => scroll(615, scrollPlaying)}
                        className="text-white text-4xl h-[165px] w-20 rounded bg-zinc-900 cursor-pointer"
                    />
                </div>
            </section>

            <section>
                <header>
                    <h1 className="text-xl mt-10 text-white font-bold">TOP RATED</h1>
                </header>
                <div className="flex justify-between h-40 items-center">
                    <IoMdArrowDropleft
                        onClick={() => scroll(-615, scrollMostRated)}
                        className="text-white text-4xl h-[165px] w-28 rounded bg-zinc-900 cursor-pointer"
                    />
                    <div className="overflow-x-auto flex scrollable-scrollbar" ref={scrollMostRated}>
                        {mostRated.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <IoMdArrowDropright
                        onClick={() => scroll(615, scrollMostRated)}
                        className="text-white text-4xl h-[165px] w-28 rounded bg-zinc-900 cursor-pointer"
                    />
                </div>
            </section>

            <section>
                <header>
                    <h1 className="text-xl mt-10 text-white font-bold">POPULAR</h1>
                </header>
                <div className="flex justify-between h-40 items-center">
                    <IoMdArrowDropleft
                        onClick={() => scroll(-615, scrollPopular)}
                        className="text-white text-4xl h-[165px] w-28 rounded bg-zinc-900 cursor-pointer"
                    />
                    <div className="overflow-x-auto flex scrollable-scrollbar" ref={scrollPopular}>
                        {popular.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <IoMdArrowDropright
                        onClick={() => scroll(615, scrollPopular)}
                        className="text-white text-4xl h-[165px] w-28 rounded bg-zinc-900 cursor-pointer"
                    />
                </div>
            </section>

            <section>
                <header>
                    <h1 className="text-xl mt-10 text-white font-bold">UPCOMING</h1>
                </header>
                <div className="flex justify-between h-40 items-center">
                    <IoMdArrowDropleft
                        onClick={() => scroll(-615, scrollUpcoming)}
                        className="text-white text-4xl h-[165px] w-28 rounded bg-zinc-900 cursor-pointer"
                    />
                    <div className="overflow-x-auto flex scrollable-scrollbar" ref={scrollUpcoming}>
                        {upcoming.map((movie) => (
                            <SmallCard
                                key={movie.id}
                                id={movie.id}
                                poster_path={movie.poster_path}
                                title={movie.title}
                            />
                        ))}
                    </div>
                    <IoMdArrowDropright
                        onClick={() => scroll(615, scrollUpcoming)}
                        className="text-white text-4xl h-[165px] w-28 rounded bg-zinc-900 cursor-pointer"
                    />
                </div>
            </section>
            <Footer />
        </section>

    );
}