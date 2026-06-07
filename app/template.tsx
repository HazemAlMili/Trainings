"use client";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: [0.85, 0, 0.15, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] as [number, number, number, number] },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className="flex flex-col flex-1 w-full min-h-full"
    >
      {children}
    </motion.div>
  );
}
