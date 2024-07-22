import { Routes, Route } from 'react-router-dom';
import Details from "../components/Details/details";
import Home from "../components/Home/home";
import Search from "../components/Search/search";
import GenrePage from '../components/Genres/genrePage';


export default function AppRoutes() {
    return (
            <Routes>
                <Route path="/" element={< Home />} />
                <Route path="/search/:movie" element={<Search />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/genre/:genre_name" element={<GenrePage />} />
            </Routes>
    )
}