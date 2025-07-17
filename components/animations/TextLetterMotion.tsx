"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export type TextLetterMotionProps = {
  text: string;
  duration?: number;
  delay?: number;
  color?: string;
  textSize?: number;
  shouldEaseOut?: boolean;
};

export function TextLetterMotion({
  text,
  duration = 4000,
  delay = 0,
  color = "#ffffff",
  textSize,
  shouldEaseOut = true,
}: TextLetterMotionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  const totalSec = duration / 1000;
  const delaySec = delay / 1000;
  const words = text.split(" ");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient && shouldReduceMotion) {
    return (
      <span
        className="inline-block font-bold leading-snug text-center"
        style={{
          color,
          fontSize: textSize ? `${textSize}px` : "64px",
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <div
      className="inline-block font-bold leading-snug text-center"
      style={{ color }}
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const letters = word.split("");
        const wordAppearDelay = delaySec + wordIndex * 0.3;

        return (
          <motion.div
            key={wordIndex}
            className="block"
            initial={{ opacity: 1, y: 0 }}
            animate={
              shouldEaseOut ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }
            }
            transition={
              shouldEaseOut
                ? {
                    delay: totalSec * 0.8 + wordIndex * 0.1,
                    duration: 0.3,
                    ease: "easeInOut",
                  }
                : {}
            }
          >
            {letters.map((char, i) => {
              const isFirst = i === 0;
              const letterDelay =
                wordAppearDelay + (isFirst ? 0 : 0.1 + i * 0.03);

              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  style={
                    textSize
                      ? { fontSize: `${textSize}px` }
                      : { fontSize: "64px" }
                  }
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: letterDelay,
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  aria-hidden
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}
