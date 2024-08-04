import { motion } from "framer-motion";
import { IoMdArrowDropright } from "react-icons/io";

type Behavior = "smooth" | "instant";

type Button = {
    value: number;
    el: React.RefObject<HTMLDivElement>;
    onClick: (value: number, el: React.RefObject<HTMLDivElement>, type: Behavior, delay: number) => void;
    isScrolling: boolean;
    delay: number;
    type: Behavior;
}

export default function CarouselRight({ value, el, onClick, isScrolling, delay, type }: Button) {
    return (
        <motion.div 
        className="absolute right-0 md:block hidden"
        whileTap={{ scale: 1.1 }}>
            <IoMdArrowDropright
                onClick={() => !isScrolling && onClick(value, el, type, delay)}
                className="text-white text-4xl w-7 h-12 rounded-s cursor-pointer bg-red-700"
            />
        </motion.div>
    )
}