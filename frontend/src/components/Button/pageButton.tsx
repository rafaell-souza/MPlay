type ChangeMovieList = {
    children: React.ReactNode;
    onClick: () => void;
    color: string;
}

export default function PageButton({ children, onClick, color }: ChangeMovieList) {
    
    return (
        <div onClick={onClick} className={`text-white px-3 py-1 mr-1 flex justify-center items-center mt-1 shrink-0 ${color}`}>
            {children}
        </div>
    )
}