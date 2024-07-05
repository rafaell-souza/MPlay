import Search from "./search"
import { useState, useEffect, useContext } from "react"
import { InputContext } from "../Context/InputContext"

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
    page: number
    total_results: number;
    total_pages: number;
}

export default function MovieSearch() {
    const [results, setResults] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const { input } = useContext(InputContext);

    function ChangePage(page: number) {
        setPage(page);
    }

    const searchFunction = async (url: string): Promise<Movie> => {
        const response = await fetch(url);
        const data: Movie = await response.json();
        return data;
    }

    useEffect(() => {
        setLoading(true);
        (async () => {
            const url = `${searchUrl}?api_key=${key}&query=${input}&page=${page}`;
        const data = await searchFunction(url);
        setResults(data);
        setLoading(false);
    })();

    }, [input, page])

    return (
        <>
        <Search data={results} loading={loading} changePage={ChangePage}/>
        </>
    )
}