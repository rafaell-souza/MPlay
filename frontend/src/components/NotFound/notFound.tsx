import Header from "../Header/header"

export default function NotFound() {
    return (
        <>
            <Header text="home" link="/" />
            <header className="flex flex-col h-[900px] md:h-screen justify-center text-white items-center">
               <div className="flex flex-col mb-10 items-center">
               <h1 className="text-7xl font-bold">404</h1>
                <h2 className="text-md font-bold w-64 mt-2 text-center">Ops... Page not found. Go back to homepage and try again.</h2>
       
               </div>
            </header>
        </>
    )
}