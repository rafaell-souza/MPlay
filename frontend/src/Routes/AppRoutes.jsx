import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ImSpinner3 } from "react-icons/im";

const Details = lazy(() => import('../components/Details/details'));
const Home = lazy(() => import('../components/Home/home'));
const Search = lazy(() => import('../components/Search/search'));
const Genres = lazy(() => import('../components/Genres/genres'));
const SignUp = lazy(() => import('../components/Auth/sign-up'));


export default function AppRoutes() {
    return (
        <Suspense fallback={
            <div className="h-screen w-screen flex justify-center items-center">
                <ImSpinner3 className="animate-spin text-3xl text-white" />
            </div>
        }>
            <Routes>
                <Route path="/" element={< Home />} />
                <Route path="/search/:query" element={<Search />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/genre/:name" element={<Genres />} />
                <Route path="/SignUp" element={<SignUp />} />
            </Routes>
        </Suspense>
    )
}