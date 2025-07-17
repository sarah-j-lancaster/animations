"use client";

import { motion } from "framer-motion";
import { IoChevronUp } from "react-icons/io5";

interface SwipeUpPromptProps {
  text?: string;
  onSwipe?: () => void;
}

export function SwipeUpPrompt({ text = 'Swipe up to continue', onSwipe }: SwipeUpPromptProps) {
  return (
    <motion.div
      initial={{ y: 42, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeIn",
      }}
      className="flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center mb-2">
        <IoChevronUp
          aria-hidden
          size={24}
          className="mb-[-8px]"
          style={{ color: "#6F6D71", opacity: 0.33 }}
        />
        <IoChevronUp
          aria-hidden
          size={24}
          className="mb-[-8px]"
          style={{ color: "#A9A6AA", opacity: 0.66 }}
        />
        <IoChevronUp
          aria-hidden
          size={24}
          style={{ color: "#FDFCFE", opacity: 1 }}
        />
      </div>
      <div
        className="text-center text-md tracking-normal"
        style={{
          color: "#A9A6AA",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}
