import Details from "./details";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    const { id } = useParams<{ id: string }>();

    async function FetchmovieDetails(id: string): Promise<MovieType>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        if(id) {
            async function fetchData() {
                const data = await FetchmovieDetails(String(id));
                setMovieDetails(data);
            }
            fetchData();
        }
    }, [id]);

    return <Details data={movieDetails} />
}