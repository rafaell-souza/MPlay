import Details from "./details";
import { useState, useEffect, useContext } from "react";
import { MovieContext } from "../Context/MovieContext";

const key: string = import.meta.env.VITE_TMDB_KEY;

type MovieType = {
    poster_path: string;
    genres: number[];
    vote_average: number;
    title: string;
    original_language: string;
    overview: string;
    release_date: string;
    origin_country: string[];
    status: string;
    runtime: number;
}

export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState<MovieType | null>(null);

    const { movieId } = useContext(MovieContext);

    async function FetchmovieDetails(id: number): Promise<MovieType>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        async function fetchData() {
            const data = await FetchmovieDetails(movieId);
            setMovieDetails(data);
        }
        fetchData();
    }, [movieId]);

    return <Details data={movieDetails} />
}