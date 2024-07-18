import { motion } from "framer-motion";
import { IoMdArrowDropleft } from "react-icons/io";

type Behavior = "smooth" | "instant";

type Button = {
    value: number;
    el: React.RefObject<HTMLDivElement>;
    onClick: (value: number, el: React.RefObject<HTMLDivElement>, type: Behavior, delay: number) => void;
    style?: string;
    isScrolling: boolean;
    delay: number;
    type: Behavior;
}

export default function CarouselLeft({ value, el, onClick, style, isScrolling, delay, type }: Button) {
    return (
        <motion.div
        className={`absolute left-0 z-20 ${style}`} 
        whileTap={{ scale: 1.1 }}>
            <IoMdArrowDropleft
            onClick={() => !isScrolling && onClick(value, el, type, delay)}
            className="text-white bg-red-700 text-4xl h-12 w-7 cursor-pointer rounded-e"
            />
        </motion.div>
    )
}