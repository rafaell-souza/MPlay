import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <section className="mt-10 relative">
                <footer>
                    <ul className="mb-2 relative flex w-full justify-center mx-auto border-b border-zinc-900 pb-2">
                        <a href="https://www.linkedin.com/in/rafael-set/" target="_blank"><li><FaLinkedinIn className="text-blue-800 text-2xl mr-2" /></li></a>
                        <a href="https://github.com/rafaell-souza" target="_blank"><li><IoLogoGithub className="text-white text-2xl" /></li></a>
                        <a href=""><li><FaTwitter className="text-blue-400 text-2xl ml-2" /></li></a>
                    </ul>
                    <p className="w-full text-center text-white text-sm">
                        All content on this website is provided by the <a href="https://www.themoviedb.org/" target="_blank"><span className="text-yellow-600">TMDB API</span></a> and is for educational purposes only. All rights reserved to the respective owners.
                    </p>

                </footer>
            </section>
    )
}