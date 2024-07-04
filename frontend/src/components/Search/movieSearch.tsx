import Search from "./search"
import { useState, useEffect, useContext } from "react"
import { InputContext } from "../Context/inputContext"

const key: string = import.meta.env.VITE_TMDB_KEY;

const searchUrl = import.meta.env.VITE_TMDB_SEARCH

type Movie = {
    results: {
        id: number,
        vote_average: number,
        poster_path: string,
        release_date: string,
        title: string,
    }[];
    total_results: number;
    total_pages: number;
}

export default function MovieSearch() {
    const [results, setResults] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { input } = useContext(InputContext);

    const searchFunction = async (url: string): Promise<Movie> => {
        const response = await fetch(url);
        const data: Movie = await response.json();
        return data;
    }

    useEffect(() => {
        setLoading(true);
        (async () => {
            const url = `${searchUrl}?api_key=${key}&query=${input}&page=${1}`;
        const data = await searchFunction(url);
        setResults(data);
        setLoading(false);
    })();

    }, [input])

    return (
        <>
        <Search data={results} loading={loading}/>
        </>
    )
}