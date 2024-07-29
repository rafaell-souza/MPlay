import { useState, useEffect } from "react";

const key = import.meta.env.VITE_TMDB_KEY;

type Results = {
    id: number;
    poster_path: string;
    title: string;
};

type Movie = {
    results: Results[];
    page: number;
    total_results: number;
    total_pages: number;
};

export default function SearchFetch(query?: string, id?: number) {
    const [data, setData] = useState<Movie>({
        results: [],
        page: 0,
        total_results: 0,
        total_pages: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const searchFunction = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        setPage(1);
        setData({ results: [], page: 0, total_results: 0, total_pages: 0 });
        setLoading(true);
        setHasMore(true);
    }, [query, id]);

    useEffect(() => {
        (async () => {
            try {
                let searchUrl = '';

                if (query && !id) {
                    searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=${page}&include_adult=false`;
                } else if (id && !query) {
                    searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&with_genres=${id}&page=${page}`;
                }

                if (searchUrl) {
                    const data = await searchFunction(searchUrl);
                    const filteredData = data.results.filter((movie: Results) => movie.poster_path !== null);

                    setData((prev) => ({
                        ...data,
                        results: page === 1 ? filteredData : [...prev.results, ...filteredData],
                    }));
                }

                setHasMore(page < data.total_pages);
                if (data.page === data.total_pages) {
                    setHasMore(false);
                }

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        })();
    }, [page, query, id]);

    return { data, loading, setPage, hasMore };
}
