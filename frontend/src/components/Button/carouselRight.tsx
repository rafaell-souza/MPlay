import { motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";

type Button = {
    value: number;
    el: React.RefObject<HTMLDivElement>;
    onClick: (value: number, el: React.RefObject<HTMLDivElement>) => void;
    style?: string;
}

export default function CarouselRight({ value, el, onClick, style }: Button) {
    return (
        <motion.div 
        className="absolute right-0"
        whileTap={{ scale: 1.1 }}>
            <IoMdArrowDropright
                onClick={() => onClick(value, el)}
                className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
            />
        </motion.div>
    )
}