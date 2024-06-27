import MyButton from "../Button/button";


const Header = () => {
    return (
        <header className="shadow-lg shadow-violet-950 w-full h-10  flex justify-between px-14 items-center fixed z-10 bg-white">

            <h1 className="text-2xl text-violet-900 font-bold">MoviesOn*</h1>

            <MyButton />
        </header>
    );
}

export default Header;