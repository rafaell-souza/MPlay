import { useRef, useState, useEffect } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import BigCard from "../Cards/big";
import SmallCard from "../Cards/small";
import { motion } from 'framer-motion';
import CarouselLeft from "../Button/carouselLeft";
import CarouselRight from "../Button/carouselRight";
import useRequest from "../../Hooks/useRequest";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Toolbar from "../Toolbar/toolbar";

const key: string = import.meta.env.VITE_TMDB_KEY;

const playingUrl: string = import.meta.env.VITE_TMDB_NOW_PLAYING;
const mostRatedUrl: string = import.meta.env.VITE_TMDB_MOST_RATED;
const popularUrl: string = import.meta.env.VITE_TMDB_POPULAR;
const upcomingUrl: string = import.meta.env.VITE_TMDB_UPCOMING;

type Results = {
    title: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
    backdrop_path: string;
    id: number;
    release_date: string;
    vote_average: number;
};

type Movie = {
    results: Results[];
    total_pages: number;
    total_results: number;
}

type Behavior = "smooth" | "instant";

export default function Home() {
    const { data: playing } = useRequest(`${playingUrl}?api_key=${key}`) as { data: Movie };
    const { data: mostRated } = useRequest(`${mostRatedUrl}?api_key=${key}`) as { data: Movie };
    const { data: popular } = useRequest(`${popularUrl}?api_key=${key}`) as { data: Movie };
    const { data: upcoming } = useRequest(`${upcomingUrl}?api_key=${key}`) as { data: Movie };

    const [autoScrollCount, setAutoScrollCount] = useState(0);
    const [isUserInteraction, setIsUserInteraction] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const playingRef = useRef<HTMLDivElement>(null);
    const mostRatedRef = useRef<HTMLDivElement>(null);
    const popularRef = useRef<HTMLDivElement>(null);
    const upcomingRef = useRef<HTMLDivElement>(null);

    const autoScrollRef = useRef<HTMLDivElement>(null);
    const bigCardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleScroll = (
        value: number,
        ref: React.RefObject<HTMLDivElement>,
        type: Behavior,
        delay: number
    ) => {
        setIsScrolling(true);
        ref.current && ref.current.scrollBy({ left: value, behavior: type });
        setTimeout(() => { setIsScrolling(false); }, delay);
    };

    function handleScrollLeft() {
        if (!isScrolling) {
            if (autoScrollRef.current) {
                if (autoScrollRef.current.scrollLeft > 0) {
                    handleScroll(-666, autoScrollRef, "smooth", 540);
                }
                else if (autoScrollRef.current?.scrollLeft === 0) {
                    handleScroll(6660, autoScrollRef, "instant", 540);
                    handleScroll(-660, autoScrollRef, "smooth", 540);
                }
            }
        }
        if (!isUserInteraction) setIsUserInteraction(true);
        
    }

    function handleScrollRight() {
        if (!isScrolling) {
            if (autoScrollRef.current) {
                if (autoScrollRef.current.scrollLeft < 6660) {
                    handleScroll(666, autoScrollRef, "smooth", 540);
                }
                else if (autoScrollRef.current.scrollLeft === 6660) {
                    handleScroll(-6660, autoScrollRef, "instant", 540)
                    handleScroll(666, autoScrollRef, "smooth", 540);
                }
            }
        }
        if (!isUserInteraction) setIsUserInteraction(true);
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (!isUserInteraction) {
            interval = setInterval(() => {

                if (autoScrollCount < 10) {
                    setAutoScrollCount(autoScrollCount + 1);
                    handleScroll(666, autoScrollRef, "smooth", 540);
                }
                if (autoScrollCount === 9) {
                    handleScroll(-6660, autoScrollRef, "instant", 540);
                    handleScroll(666, autoScrollRef, "smooth", 540);
                    setAutoScrollCount(0);
                }
            }, 4000);
        }

        return () => clearInterval(interval);

    }, [autoScrollCount, isUserInteraction]);

    return (
        <>
            <Header link="signin" text="sign in" />
            <Toolbar />
            <section className="relative top-10 md:w-[666px] lg:w-[800px] h-[1300px] md:left-[233px] flex flex-col bg-black">

                <section className="relative">
                    <div
                        className="z-30 flex absolute bottom-0 right-10 bottom-10"
                    >
                        <motion.div
                            whileTap={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}>
                            <IoMdArrowDropleft
                                className="text-white hidden md:block bg-red-700 text-3xl cursor-pointer rounded-s"
                                onClick={() => handleScrollLeft()}
                            />
                        </motion.div>

                        <motion.div
                            whileTap={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}>
                            <IoMdArrowDropright
                                className="text-white hidden md:block bg-red-700 text-3xl ml-[2px] cursor-pointer rounded-e"
                                onClick={() => handleScrollRight()}
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex overflow-x-scroll scrollable-scrollbar snap-x snap-mandatory"
                        ref={autoScrollRef}>
                        {
                        playing.results && 
                        [...playing.results.slice(0, 10),
                            ...(playing.results.length > 0 ? [playing.results[0]] : [])]
                            .map((movie, index) => (
                                <div
                                    className="w-full shrink-0 snap-center"
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
                    </motion.div>
                </section>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}>
                    <section>
                        <header>
                            <h1 className="text-xl mt-7 text-white font-bold">NOW PLAYING</h1>
                        </header>
                        <div className="flex justify-between items-center h-[180px] relative">

                            <CarouselLeft
                                value={-130}
                                el={playingRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

                            <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center snap-x snap-mandatory" ref={playingRef}>
                                {playing.results?.map((movie) => (
                                    <SmallCard
                                        key={movie.id}
                                        id={movie.id}
                                        poster_path={movie.poster_path}
                                        title={movie.title}
                                        vote_average={movie.vote_average}
                                    />
                                ))}
                            </div>

                            <CarouselRight
                                value={130}
                                el={playingRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

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

                            <CarouselLeft
                                value={-130}
                                el={mostRatedRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

                            <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center snap-x snap-mandatory" ref={mostRatedRef}>
                                {mostRated.results?.map((movie) => (
                                    <SmallCard
                                        key={movie.id}
                                        id={movie.id}
                                        poster_path={movie.poster_path}
                                        title={movie.title}
                                        vote_average={movie.vote_average}
                                    />
                                ))}
                            </div>

                            <CarouselRight
                                value={130}
                                el={mostRatedRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

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

                            <CarouselLeft
                                value={-130}
                                el={popularRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

                            <div className="snap-x snap-mandatory overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={popularRef}>
                                {popular.results?.map((movie) => (
                                    <SmallCard
                                        key={movie.id}
                                        id={movie.id}
                                        poster_path={movie.poster_path}
                                        title={movie.title}
                                        vote_average={movie.vote_average}
                                    />
                                ))}
                            </div>

                            <CarouselRight
                                value={130}
                                el={popularRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

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

                            <CarouselLeft
                                value={-130}
                                el={upcomingRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

                            <div className="snap-x snap-mandatory overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={upcomingRef}>
                                {upcoming.results?.map((movie) => (
                                    <SmallCard
                                        key={movie.id}
                                        id={movie.id}
                                        poster_path={movie.poster_path}
                                        title={movie.title}
                                        vote_average={movie.vote_average}
                                    />
                                ))}
                            </div>

                            <CarouselRight
                                value={130}
                                el={upcomingRef}
                                onClick={handleScroll}
                                isScrolling={isScrolling}
                                delay={250}
                                type="smooth"
                            />

                        </div>
                    </section>
                </motion.div>
                <Footer />
            </section>
        </>
    );
}
