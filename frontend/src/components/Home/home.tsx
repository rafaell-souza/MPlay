import { useRef, useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import BigCard from "../Cards/big";
import SmallCard from "../Cards/small";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";

type MovieType = {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    id: number;
};

type GenresType = {
    id: number;
    name: string;
};

type HomeProps = {
    playing: MovieType[];
    mostRated: MovieType[];
    popular: MovieType[];
    upcoming: MovieType[];
    genres: GenresType[];
};

export default function Home({ playing, mostRated, popular, upcoming, genres }: HomeProps) {
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

            <section>
                <header>
                    <h1 className="text-xl mt-10 text-white font-bold">GENRES</h1>
                </header>
                <div className="grid grid-cols-5 mt-2 px-8 pb-5 rounded-lg bg-zinc-950">
                    {
                        genres.map((genre) => (
                            <p
                                className="hover:bg-yellow-800 text-sm text-center border border-yellow-800 mt-5 text-white rounded-full w-28"
                                key={genre.id}>{genre.name}</p>
                        ))
                    }
                </div>
            </section>

            <section className="mt-10 relative">
                <footer>
                    <ul className="mb-2 relative flex w-full justify-center mx-auto border-b border-zinc-900 pb-2">
                        <a href="https://www.linkedin.com/in/rafael-set/" target="_blank"><li><FaLinkedinIn className="text-blue-800 text-2xl mr-2" /></li></a>
                        <a href="https://github.com/rafaell-souza" target="_blank"><li><IoLogoGithub className="text-white text-2xl" /></li></a>
                        <a href=""><li><FaTwitter className="text-blue-400 text-2xl ml-2" /></li></a>
                    </ul>
                    <p className="w-full text-center text-white text-sm">
                        All content on this website is provided by the <a href="https://www.themoviedb.org/" target="_blank"><span className="text-yellow-600">TMDB API</span></a> and is for educational purposes only. All rights reserved to the respective owners.
                    </p>

                </footer>
            </section>

        </section>

    );
}