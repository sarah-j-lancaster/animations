"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export type TextWordMotionProps = {
  text: string;
  subtext?: string;
  duration?: number;
  delay?: number;
  color?: string;
  subtextColor?: string;
  shouldEaseOut?: boolean;
};

export function TextWordMotion({
  text,
  subtext,
  duration = 4000,
  delay = 0,
  color = "#fdfcfe",
  subtextColor = "#fdfcfe",
  shouldEaseOut = false,
}: TextWordMotionProps) {
  const shouldReduceMotion = useReducedMotion();
  const delaySec = delay / 1000;
  const mainWords = text.split(" ");
  const subtextWords = subtext ? subtext.split(" ") : [];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient && shouldReduceMotion) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4">
          <div className="text-4xl font-bold" style={{ color }}>
            {text}
          </div>
        </div>
        {subtext && (
          <div>
            <div className="text-base" style={{ color: subtextColor }}>
              {subtext}
            </div>
          </div>
        )}
      </div>
    );
  }

  const mainWordDurationSeconds = 0.5;
  const mainWordOffsetSeconds = 0.15;
  const mainTextTotalTimeSeconds =
    mainWordDurationSeconds + (mainWords.length - 1) * mainWordOffsetSeconds;

  const subtextWordDurationSeconds = 0.6;
  const subtextWordOffsetSeconds = 0.2;
  const subtextStartDelaySeconds = delaySec + mainTextTotalTimeSeconds - 0.5;

  const totalDuration = duration / 1000;
  const fadeOutStart = totalDuration * 0.8;

  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      aria-label={`${text}${subtext ? ` ${subtext}` : ""}`}
    >
      <div className="mb-4" aria-hidden>
        {mainWords.map((word, index) => {
          const wordDelay = delaySec + index * mainWordOffsetSeconds;
          const fadeOutDelay = fadeOutStart + index * 0.1;

          return (
            <motion.div
              key={`main-${index}`}
              className="inline-block mr-2"
              initial={{ opacity: 1, y: 0 }}
              animate={
                shouldEaseOut ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }
              }
              transition={
                shouldEaseOut
                  ? {
                      delay: fadeOutDelay,
                      duration: 0.3,
                      ease: "easeInOut",
                    }
                  : {}
              }
            >
              <motion.span
                className="inline-block text-4xl font-bold"
                style={{ color }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordDelay,
                  duration: mainWordDurationSeconds,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {subtext && (
        <div aria-hidden>
          {subtextWords.map((word, index) => {
            const wordDelay =
              subtextStartDelaySeconds + index * subtextWordOffsetSeconds;
            const fadeOutDelay =
              fadeOutStart + mainWords.length * 0.1 + index * 0.1;

            return (
              <motion.div
                key={`sub-${index}`}
                className="inline-block mr-2"
                initial={{ opacity: 1, y: 0 }}
                animate={
                  shouldEaseOut ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }
                }
                transition={
                  shouldEaseOut
                    ? {
                        delay: fadeOutDelay,
                        duration: 0.3,
                        ease: "easeInOut",
                      }
                    : {}
                }
              >
                <motion.span
                  className="inline-block text-base"
                  style={{ color: subtextColor }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: wordDelay,
                    duration: subtextWordDurationSeconds,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
