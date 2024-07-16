import { useRef, useState, useEffect } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import BigCard from "../Cards/big";
import SmallCard from "../Cards/small";
import { motion } from 'framer-motion';

type MovieType = {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    id: number;
    release_date: string;
    vote_average: number;
};

type HomeProps = {
    playing: MovieType[];
    mostRated: MovieType[];
    popular: MovieType[];
    upcoming: MovieType[];
};

export default function Home({ playing, mostRated, popular, upcoming }: HomeProps) {

    const [isUserInteraction, setIsUserInteraction] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [infinitePlaying, setInfinitePlaying] = useState<MovieType[]>([]);
    const [blockUserButtonMultpleClick, setBlockUserButtonMultpleClick] = useState<boolean>(false);

    const playingRef = useRef<HTMLDivElement>(null);
    const mostRatedRef = useRef<HTMLDivElement>(null);
    const popularRef = useRef<HTMLDivElement>(null);
    const upcomingRef = useRef<HTMLDivElement>(null);

    const bigCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScroll = (value: number, ref: React.RefObject<HTMLDivElement>) => {
        ref.current && ref.current.scrollBy({ left: value });
    };

    const handleScrollView = (value: number, specific?: ScrollBehavior) => {
        if (bigCardRefs.current[value]) {
            bigCardRefs.current[value]?.scrollIntoView({ block: "nearest", behavior: specific || "smooth" });
        }
    }

    function handleScrollViewLeft() {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
        else {
            setCurrentIndex(bigCardRefs.current.length - 1);
            handleScrollView(bigCardRefs.current.length - 1, "instant");
            setCurrentIndex((prev) => prev - 1);
        }
    }

    function handleScrollViewRight() {
        if (currentIndex < bigCardRefs.current.length -1) {
            setCurrentIndex((prev) => prev + 1);
        }
        else {
            setCurrentIndex(0);
            handleScrollView(0, "instant");
            setCurrentIndex((prev) => prev + 1);
        }
    }

    useEffect(() => {
        setInfinitePlaying([...playing.slice(0, 10), ...(playing.length > 0 ? [playing[0]] : [])]);
    }, [playing]);

    useEffect(() => {
        handleScrollView(currentIndex)
        setTimeout(() => { setBlockUserButtonMultpleClick(false) }, 500);
    }, [currentIndex]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!isUserInteraction) {
            interval = setInterval(() => {
                if (currentIndex < bigCardRefs.current.length -1) {
                    setCurrentIndex((prev) => prev + 1);
                }
                else {
                    setCurrentIndex(0);
                    handleScrollView(0, "instant");
                    setCurrentIndex((prev) => prev + 1);
                }
            }, 5000);
        }

        return () => clearInterval(interval);
    }
    , [currentIndex, isUserInteraction]);

    return (
        <section className="relative top-10 w-[666px] left-[234px] flex flex-col bg-black">

            <section className="relative">
                <div className={`${blockUserButtonMultpleClick ? "pointer-events-none" : ""} z-30 flex absolute bottom-0 right-10 bottom-10`}>
                    <motion.div 
                        whileTap={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => { 
                            setIsUserInteraction(true);
                            handleScrollViewLeft();
                            setBlockUserButtonMultpleClick(true);
                            }}>
                        <IoMdArrowDropleft className="text-white bg-red-700 h-6 w-12 cursor-pointer" />
                    </motion.div>

                    <motion.div
                        whileTap={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => { 
                            setIsUserInteraction(true);
                            handleScrollViewRight();
                            setBlockUserButtonMultpleClick(true);
                            }}>
                        <IoMdArrowDropright className="text-white bg-red-700 h-6 w-12 cursor-pointer ml-1" />
                    </motion.div>
                </div>

                <div className="flex overflow-x-hidden border">
                    {infinitePlaying.map((movie, index) => (
                        <div
                            className="w-full shrink-0 border"
                            ref={(el) => (bigCardRefs.current[index] = el)}
                            key={index}
                        >
                            <BigCard
                                title={movie.title}
                                image={movie?.backdrop_path}
                                overview={movie.overview}
                                release_date={movie.release_date}
                                vote_average={movie.vote_average}
                                id={movie.id}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <section>
                    <header>
                        <h1 className="text-xl mt-7 text-white font-bold">PLAYING NOW</h1>
                    </header>
                    <div className="flex justify-between items-center h-[180px] relative">
                        <motion.div
                            className="absolute left-0 z-20"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropleft
                                onClick={() => handleScroll(-740, playingRef)}
                                className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                            />
                        </motion.div>
                        <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={playingRef}>
                            {playing.map((movie) => (
                                <SmallCard
                                    key={movie.id}
                                    id={movie.id}
                                    poster_path={movie.poster_path}
                                    title={movie.title}
                                />
                            ))}
                        </div>
                        <motion.div className="absolute right-0"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropright
                                onClick={() => handleScroll(740, playingRef)}
                                className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                            />
                        </motion.div>
                    </div>
                </section>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <section>
                    <header>
                        <h1 className="text-xl mt-4 text-white font-bold">TOP RATED</h1>
                    </header>
                    <div className="flex justify-between items-center h-[180px] relative">
                        <motion.div
                            className="absolute left-0 z-20"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropleft
                                onClick={() => handleScroll(-600, mostRatedRef)}
                                className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                            />
                        </motion.div>
                        <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={mostRatedRef}>
                            {mostRated.map((movie) => (
                                <SmallCard
                                    key={movie.id}
                                    id={movie.id}
                                    poster_path={movie.poster_path}
                                    title={movie.title}
                                />
                            ))}
                        </div>
                        <motion.div className="absolute right-0"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropright
                                onClick={() => handleScroll(600, mostRatedRef)}
                                className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                            />
                        </motion.div>
                    </div>
                </section>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <section>
                    <header>
                        <h1 className="text-xl mt-4 text-white font-bold">POPULAR</h1>
                    </header>
                    <div className="flex justify-between items-center h-[180px] relative">
                        <motion.div
                            className="absolute left-0 z-20"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropleft
                                onClick={() => handleScroll(-740, popularRef)}
                                className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                            />
                        </motion.div>
                        <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={popularRef}>
                            {popular.map((movie) => (
                                <SmallCard
                                    key={movie.id}
                                    id={movie.id}
                                    poster_path={movie.poster_path}
                                    title={movie.title}
                                />
                            ))}
                        </div>
                        <motion.div className="absolute right-0"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropright
                                onClick={() => handleScroll(740, popularRef)}
                                className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                            />
                        </motion.div>
                    </div>
                </section>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <section>
                    <header>
                        <h1 className="text-xl mt-4 text-white font-bold">UPCOMING</h1>
                    </header>
                    <div className="flex justify-between items-center h-[180px] relative">
                        <motion.div
                            className="absolute left-0 z-20"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropleft
                                onClick={() => handleScroll(-740, upcomingRef)}
                                className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                            />
                        </motion.div>
                        <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={upcomingRef}>
                            {upcoming.map((movie) => (
                                <SmallCard
                                    key={movie.id}
                                    id={movie.id}
                                    poster_path={movie.poster_path}
                                    title={movie.title}
                                />
                            ))}
                        </div>
                        <motion.div className="absolute right-0"
                            whileTap={{ scale: 1.1 }}
                        >
                            <IoMdArrowDropright
                                onClick={() => handleScroll(740, upcomingRef)}
                                className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                            />
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </section>

    );
}
