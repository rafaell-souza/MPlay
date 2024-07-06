import { HiUserCircle } from "react-icons/hi2";

type ReviewType = {
    author: string;
    username: string;
    avatar: string;
    content: string;
}

export default function ReviewCard({ author, username, avatar, content }: ReviewType) {
    const baseimageUrl = "https://image.tmdb.org/t/p/original";
    return (
        <div className="flex h-28 mt-3">
            <div className="flex flex-col w-28 shrink-0 justify-center items-center">
                {
                    avatar ? (
                        <>
                        <img className="rounded-full h-14 w-14" src={baseimageUrl+avatar} alt={author} />
                        <p className="text-sm">{author}</p>
                        </>
                    ) : (
                        <>
                        <HiUserCircle className="w-16 h-16 text-gray-400" />
                        <p className="text-sm">{author}</p>
                        </>
                    )
                }
            </div>
            
            <div className="flex flex-col">
                <h1 className="text-yellow-600 text-xl pl-2">{username}</h1>
                <p className="overflow-y-auto p-2 text-xs rounded-lg scrollable-scrollbar border-l border-r border-zinc-700 w-[550px] mt-1">{content}</p>
            </div>
        </div>
    )
}