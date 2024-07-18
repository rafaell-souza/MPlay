import { motion } from "framer-motion";
import { IoMdArrowDropleft } from "react-icons/io";

type Button = {
    value: number;
    el: React.RefObject<HTMLDivElement>;
    onClick: (value: number, el: React.RefObject<HTMLDivElement>) => void;
    style?: string;
}

export default function CarouselLeft({ value, el, onClick, style }: Button) {
    return (
        <motion.div
        className={`absolute left-0 z-20 ${style}`} 
        whileTap={{ scale: 1.1 }}>
            <IoMdArrowDropleft
            onClick={() => onClick(value, el)}
            className="text-white bg-zinc-700 text-4xl h-12 w-7 cursor-pointer rounded-e"
            />
        </motion.div>
    )
}