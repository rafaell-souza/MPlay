import MyButton from "../Button/button";

const Header = ({ isloggedin }: {isloggedin: string}) => {
    const style = "bg-zinc-800 h-7 w-20 text-white rounded-lg hover:bg-zinc-950"

    return (
        <header className="shadow-lg shadow-violet-950 w-full h-10  flex justify-between px-14 items-center fixed z-10 bg-white">

            <h1 className="text-2xl text-violet-900 font-bold">MoviesOn*</h1>

            <MyButton text={isloggedin} style={style} />
        </header>
    );
}

export default Header;