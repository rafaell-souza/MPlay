import { Routes, Route } from 'react-router-dom';
import MovieDetails from '../components/Details/movieDetails';
import MovieHome from '../components/Home/moviehome';
import MovieSearch from '../components/Search/movieSearch';
import GenrePage from '../components/Genres/genrePage';


export default function AppRoutes() {
    return (
            <Routes>
                <Route path="/" element={<MovieHome />} />
                <Route path="/search/:movie" element={<MovieSearch />} />
                <Route path="/details/:id" element={<MovieDetails />} />
                <Route path="/genre/:genre_name" element={<GenrePage />} />
            </Routes>
    )
}