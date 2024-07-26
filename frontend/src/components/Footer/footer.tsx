import { VscGithubAlt } from 'react-icons/vsc'
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { SiThemoviedatabase } from 'react-icons/si'

export default function Footer() {
    return (
        <div className="flex flex-col py-3 items-center h-36 mt-6 bg-zinc-950">
            <ul className="flex h-8 w-40 justify-between">
                <a target="_blank" href="https://github.com/rafaell-souza">
                    <li>
                        <VscGithubAlt className="hover:bg-zinc-800 text-3xl rounded p-1 text-white" />
                    </li>
                </a>
                <a target="_blank" href="https://x.com/rafaSouza44">
                    <li>
                        <FaTwitter className="hover:bg-zinc-800 text-3xl p-1 rounded text-white" />
                    </li>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/rafael-set/">
                    <li>
                        <FaLinkedinIn className="hover:bg-zinc-800 text-3xl p-1 rounded text-white" />
                    </li>
                </a>
                <div className="border-r border-zinc-700"></div>
                <a target="_blank" href="https://www.themoviedb.org/">
                    <li>
                        <SiThemoviedatabase className="text-3xl p-1 rounded bg-blue-900 hover:opacity-80 text-white" />
                    </li>
                </a>
            </ul>
            <h1 className="mx-auto font-bold mt-3 border-b border-zinc-500 text-white">About the website</h1>
            <p className="mt-2 text-zinc-300 w-[450px] text-sm text-center">
                All data was provided by The Movie Database API, and this website has no commercial purpose. Contact me: <span className="text-blue-500"><a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=rafaellsza03@gmail.com">rafaellsza03@gmail.com</a>
                </span>
            </p>
        </div>
    )
}