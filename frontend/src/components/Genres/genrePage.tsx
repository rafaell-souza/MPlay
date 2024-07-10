import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Genres from "./genres";

const key = import.meta.env.VITE_TMDB_KEY;

export default function GenrePage() {
    const [movieList, setMovieList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const { genre_name } = useParams<{ genre_name: string }>();

    return (
        <Genres />
    )
}