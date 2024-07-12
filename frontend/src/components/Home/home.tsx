import { useRef, useState } from "react";
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

    const scroll = (value: number, ref: React.RefObject<HTMLDivElement>) => {
        ref.current && ref.current.scrollBy({ left: value });
    };

    return (
        <section className="relative top-10 w-[666px] left-[234px] flex flex-col bg-black">
            <section className="relative">
                <div className="absolute z-30 right-5 top-[30%] flex flex-col">
                    {
                        topPlaying.map((movie,index) => {
                            return (
                                <input 
                                type="radio" 
                                key={movie.id} 
                                className="mt-2"
                                />
                            )
                        })
                    }
                </div>
                <motion.div 
                className="flex overflow-x-auto scrollable-scrollbar">
                    {topPlaying.map((movie) => (
                        <BigCard
                            key={movie.id}
                            title={movie.title}
                            image={movie?.backdrop_path}
                            id={movie.id}
                        />
                    ))}
                </motion.div>
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
                    onClick={() => scroll(-740, scrollPlaying)}
                    className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                />
                </motion.div>
                <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={scrollPlaying}>
                    {playingList.map((movie) => (
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
                    onClick={() => scroll(740, scrollPlaying)}
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
                        onClick={() => scroll(-600, scrollMostRated)}
                        className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                    />
                    </motion.div>
                    <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={scrollMostRated}>
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
                        onClick={() => scroll(600, scrollMostRated)}
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
                        onClick={() => scroll(-740, scrollPopular)}
                        className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                    />
                    </motion.div>
                    <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={scrollPopular}>
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
                        onClick={() => scroll(740, scrollPopular)}
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
                        onClick={() => scroll(-740, scrollUpcoming)}
                        className="text-white text-4xl h-12 w-7 cursor-pointer bg-red-700 rounded-e"
                    />
                    </motion.div>
                    <div className="overflow-x-auto flex scrollable-scrollbar h-48 items-center" ref={scrollUpcoming}>
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
                        onClick={() => scroll(740, scrollUpcoming)}
                        className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
                    />
                    </motion.div>
                </div>
            </section>
            </motion.div>
        </section>

    );
}