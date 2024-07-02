import NavigateTo from "../Button/button";

const Header = ({isLogged}: {isLogged: boolean}) => {
    return (
        <header 
        className="shadow-lg shadow-zinc-950 w-full h-10 flex justify-between px-14 items-center fixed z-20 bg-white">
            
            <h1 className="text-2xl text-violet-900 font-bold">MoviesOn</h1>

            <NavigateTo link="/signup" style="h-6 w-20">
                {isLogged ? "Sign Out" : "Account"}
            </NavigateTo>
        </header>
    );
}

export default Header;