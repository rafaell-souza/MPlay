import Details from "./details";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const key: string = import.meta.env.VITE_TMDB_KEY;

type MovieType = {
    id: number
    poster_path: string;
    genres: { id: number, name: string }[];
    vote_average: number;
    title: string;
    original_language: string;
    overview: string;
    release_date: string;
    origin_country: string[];
    status: string;
    runtime: number;
}

type MovieType2 = {
    id: number;
    poster_path: string;
    title: string;
}[]

type ReviewType = {
    author: string;
    author_details: {avatar_path: string, username: string};
    content: string;
}

export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState<MovieType | null>(null);
    const [recommendations, setRecommendations] = useState<MovieType2 | null>(null);
    const [reviews, setReviews] = useState<ReviewType[] | null>(null);

    const { id } = useParams<{ id: string }>();

    async function FetchmovieDetails(url: string) {
    const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        if(id) {
            async function fetchData() {
                const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
                const url2 = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${key}`
                const url3 = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}`

                const data = await FetchmovieDetails(url);
                const recommendations = await FetchmovieDetails(url2);
                const reviews = await FetchmovieDetails(url3);

                setMovieDetails(data);
                setRecommendations(recommendations.results);
                setReviews(reviews.results);
            }

            fetchData();
        }
    }, [id]);

    return <Details data={movieDetails} data2={recommendations} data3={reviews} />;
}