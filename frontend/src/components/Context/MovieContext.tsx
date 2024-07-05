import { createContext, useState } from "react";

// get the movie id when it's clicked
export const MovieContext = createContext<any>("");
export const MovieProvider: React.FC = ({ children }) => {
    const [movieId, setMovieId] = useState<number>(0);

    function handleMovieId(id: number) {
        setMovieId(id);
    }

    return (
        <MovieContext.Provider value={{movieId, handleMovieId}}>
        {children}
        </MovieContext.Provider>
    );
}