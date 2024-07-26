import { useState, useEffect } from "react"

const key = import.meta.env.VITE_TMDB_KEY;
const searchUrl = import.meta.env.VITE_TMDB_SEARCH;

type Results = {
    id: number,
    poster_path: string,
    title: string,
}

type Movie = {
    results: Results[];
    page: number;
    total_results: number;
    total_pages: number;
}

export default function SearchFetch(movieName: string) {
    const [data, setData] = useState<(Movie)>({
        results: [],
        page: 0,
        total_results: 0,
        total_pages: 0
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const searchFunction = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    const handlePageChange = () => {
            setPage(prev => prev + 1);
    }

    useEffect(() => {
        setData({ results: [], page: 0, total_results: 0, total_pages: 0 });
        setPage(1);
        setLoading(true);
    }, [movieName])

    useEffect(() => {
        if (movieName) {
            (async () => {
                try {
                    const url = `${searchUrl}?api_key=${key}&query=${movieName}&page=${page}`;
                    const data = await searchFunction(url);
                    const filteredData = data.results.filter((movie: Results) => movie.poster_path !== null);

                    setData(prev => ({
                        ...data,
                        results: page === 1 ? filteredData : [...prev.results, ...filteredData]
                    }));

                    setLoading(false);
                }
                catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            })();
        }
    }, [page, movieName])

    return { data, loading, handlePageChange }
}