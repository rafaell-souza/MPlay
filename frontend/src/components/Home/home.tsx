import { useEffect, useState, useRef } from "react";
import BigCard from "../Card/bigCard";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const movieUrl = import.meta.env.VITE_TMDB_MOST_RATED;
const apiKey = import.meta.env.VITE_TMDB_KEY;

type Movie = {
  poster_path: string;
  backdrop_path: string;
  title: string;
};

export default function Home() {
  const [mostRated, setMostRated] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      scrollRef.current.scrollLeft -= 680; 
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 680;
    }
  };

  return (
    <>
      <button
        className="w-20 h-80 absolute right-0 z-10 top-14 flex justify-end items-center bg-gradient-to-r from-transparent to-zinc-950"
        onClick={scrollRight}
      >
        <MdArrowForwardIos className="h-10 w-10 text-white" />
      </button>

      <div className="ml-40 relative top-14 overflow-x-auto flex mr-1" ref={scrollRef}>
        {forBigCard.map((movie, index) => {
          return (
            <BigCard
              image={movie && imageUrlBase + movie.backdrop_path}
              title={movie && movie.title}
              key={index}
            />
          );
        })}
      </div>

      <button
        className="w-20 h-80 absolute left-40 z-10 top-14 flex justify-start items-center bg-gradient-to-l from-transparent to-zinc-950"
        onClick={scrollLeft}
      >
        <MdArrowBackIosNew className="h-10 w-10 text-white" />
      </button>
    </>
  );
}
