import Search from "./search"
import Toolbar from "../Toolbar/toolbar";
import { useState, useEffect } from "react"

const key: string = import.meta.env.VITE_TMDB_KEY;

const searchUrl = import.meta.env.VITE_TMDB_SEARCH

type Movie = {
    results: {
        id: number,
        vote_average: number,
        genre_ids: number[],
        overview: string,
        poster_path: string,
        release_date: string,
        title: string,
    }[];
    total_results: number;
    total_pages: number;
}

export default function MovieSearch() {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = (input: string) => {
        setSearch(input);
    }

    const searchFunction = async (url: string): Promise<Movie> => {
        const response = await fetch(url);
        const data: Movie = await response.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
        setLoading(true);
        (async () => {
            const url = `${searchUrl}?api_key=${key}&query=${search}&page=${1}`;
        const data = await searchFunction(url);
        setResults(data);
        setLoading(false);
    })();


    }, [search])

    return (
        <>
        <Toolbar onSubmit={onSubmit} />
        <Search data={results} loading={loading}/>
        </>
    )
}