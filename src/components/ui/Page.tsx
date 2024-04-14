'use client';
import { motion, type HTMLMotionProps } from "framer-motion";

const pageAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.2,
  },
};

export const Page = ({ children, ...rest }: HTMLMotionProps<"div">) => {
  return (
    <motion.main {...pageAnimation} {...rest}>
      {children}
    </motion.main>
  );
}
