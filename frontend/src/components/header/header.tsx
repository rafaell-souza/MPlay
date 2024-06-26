import MyButton from "../Button/button";


const Header = () => {
    return (
        <header className="shadow-lg shadow-violet-950  h-10 rounded-es-full rounded-ee-full flex justify-between px-14 items-center">

            <h1 className="text-2xl text-violet-900 font-bold">MoviesOn*</h1>

            <MyButton />
        </header>
    );
}

export default Header;