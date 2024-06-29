import { useEffect, useState, useRef } from "react";
import BigCard from "../Card/bigCard";
import Card from "../Card/Card";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const movieUrl = import.meta.env.VITE_TMDB_MOST_RATED;
const apiKey = import.meta.env.VITE_TMDB_KEY;

type Movie = {
  poster_path: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
    id: number;
};

export default function Home() {
  const [mostRated, setMostRated] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const topRatedRef = useRef<HTMLDivElement>(null);

  const fetchMostRated = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setMostRated(data.results);
  };

  useEffect(() => {
    const topRated = `${movieUrl}?api_key=${apiKey}`;
    fetchMostRated(topRated);
  }, []);

  const imageUrlBase = "https://image.tmdb.org/t/p/w500";
  const forBigCard = mostRated.slice(0, 5);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 720; 
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 720;
    }
  };

  const scrollLeftTopRated = () => {
    if (topRatedRef.current) {
      topRatedRef.current.scrollLeft -= 250;
    }
  }
    const scrollRightTopRated = () => {
        if (topRatedRef.current) {
        topRatedRef.current.scrollLeft += 250;
        }
    }

  return (
    <>
      <button
        className="w-10 h-[340px] absolute right-0 z-10 top-10 flex justify-end items-center bg-gradient-to-r from-transparent to-zinc-950 opacity-90" onClick={scrollRight}>
        <MdArrowForwardIos className="h-10 w-6 text-white"/>
      </button>

      <div className="ml-40 relative top-10 overflow-x-auto flex " ref={scrollRef}>
        {forBigCard.map((movie, index) => {
          return (
            <BigCard
              image={movie && imageUrlBase + movie.backdrop_path}
              title={movie && movie.title}
                id={movie.id}
              key={index}
            />
          );
        })}
      </div>

      <button
        className="w-12 h-[340px] absolute left-40 z-10 top-10 flex justify-start items-center bg-gradient-to-l from-transparent to-zinc-950 opacity-90"
        onClick={scrollLeft}
      >
        <MdArrowBackIosNew className="h-10 w-6 text-white" />
      </button>

        <h1 
        className="w-40 relative left-40 top-12 ml-1 font-bold text-violet-950 text-xl">
            TOP RATED
        </h1>
        
        <button
        className="w-10 h-[200px] top-[432px] absolute z-10 flex justify-end items-center bg-gradient-to-r from-transparent to-zinc-950  right-0"
        onClick={scrollRightTopRated}>
            <MdArrowForwardIos className="h-10 w-6 text-white"/>
        </button>
        
        <div 
        className="relative left-40 flex top-12 overflow-x-auto w-80 w-[730px] bg-violet-950 overflow-y-none"
        ref={topRatedRef}>
            {mostRated.map((movie, index) => {
                return (
                    <Card
                        image={imageUrlBase + movie.poster_path}
                        id={movie.id}
                        key={index}
                    />
                );
            })}
        </div>
        <button
        className="w-12 h-[200px] top-[432px] absolute left-40 z-10 flex justify-start items-center bg-gradient-to-l from-transparent to-zinc-950"
        onClick={scrollLeftTopRated}>
            <MdArrowBackIosNew className="h-10 w-6 text-white"/>
        </button>
    </>
  );
}
