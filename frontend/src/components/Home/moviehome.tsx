import Home from "./home";
import { useState, useEffect } from "react";

const key: string = import.meta.env.VITE_TMDB_KEY;
const playingUrl: string = import.meta.env.VITE_TMDB_NOW_PLAYING;

type MovieType = {
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    id: number;
};

export default function MovieHome() {
    const [moviesPlaying, setMoviesPlaying] = useState<MovieType[]>([]);

    async function fetchData(url: string): Promise<MovieType[]> {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }

    useEffect(() => {
        async function SearchMovies() {
            try {
                const url = `${playingUrl}?api_key=${key}`;
                const movieList = await fetchData(url);
                setMoviesPlaying(movieList);
            }
            catch (error) {
                console.error(error)
            }
        }
        SearchMovies();
    }, []);

    return <Home playing={moviesPlaying} />;
}
