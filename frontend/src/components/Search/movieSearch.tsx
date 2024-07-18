import Search from "./search"
import { useState, useEffect } from "react"
import { useParams } from "react-router";

const key: string = import.meta.env.VITE_TMDB_KEY;
const searchUrl = import.meta.env.VITE_TMDB_SEARCH

type Results = {
        id: number,
        poster_path: string,
        title: string,
}

type Movie = {
    results: Results[];
    page: number
    total_results: number;
}

export default function MovieSearch() {
    const [results, setResults] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { movie } = useParams<{ movie: string }>();

    const searchFunction = async (url: string): Promise<Movie> => {
        const response = await fetch(url);
        const data: Movie = await response.json();
        return data;
    }

    useEffect(() => {
        setLoading(true);
        if(movie) {
            (async () => {
                const url = `${searchUrl}?api_key=${key}&query=${movie}&page=${2}`;
            const data = await searchFunction(url);
            setResults(data);
            setLoading(false);
        })();
        }

    }, [movie])

    return (
        <>
        <Search data={results} loading={loading} text={movie}/>
        </>
    )
}