import { Link } from 'react-router-dom';

type ButtonProps = {
    link: string;
    children: React.ReactNode;
    style: string;
    onClick?: () => void;
};

export default function NavigateTo({ link, children, style, onClick }: ButtonProps) {
  return (
    <Link 
        to={link} 
        className={`hover:opacity-80 text-white cursor-pointer bg-zinc-950 flex justify-center rounded-lg shadow shadow-black transition-opacity duration-100 ${style}`} 
        onClick={onClick}>
        {children}
    </Link>
  )
}