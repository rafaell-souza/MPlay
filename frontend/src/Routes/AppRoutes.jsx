import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MovieDetails from '../components/Details/movieDetails';
import MovieHome from '../components/Home/moviehome';
import MovieSearch from '../components/Search/movieSearch';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MovieHome />} />
                <Route path="/search" element={<MovieSearch />} />
                <Route path="/details" element={<MovieDetails />} />
            </Routes>
        </BrowserRouter>
    )
}