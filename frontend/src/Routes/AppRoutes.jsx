import { Routes, Route } from 'react-router-dom';
import MovieDetails from '../components/Details/movieDetails';
import MovieHome from '../components/Home/moviehome';
import MovieSearch from '../components/Search/movieSearch';

export default function AppRoutes() {
    return (
            <Routes>
                <Route path="/" element={<MovieHome />} />
                <Route path="/search/:movie" element={<MovieSearch />} />
                <Route path="/details/:id" element={<MovieDetails />} />
            </Routes>
    )
}