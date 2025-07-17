"use client";

import { motion } from "framer-motion";

export type SolarMotionProps = {
  innerColor?: string;
  outerColor?: string;
  duration: number;
  delay?: number;
  radius: number;
  shouldFadeOut?: boolean;
};

export function SolarMotion({
  innerColor = "#FFD25F",
  outerColor = "#29282D",
  duration,
  delay = 0,
  radius,
  shouldFadeOut = false,
}: SolarMotionProps) {
  const delaySec = delay / 1000;
  const durationSec = duration / 1000;

  const growthDuration = 0.8;
  const outerDelayOffset = 0.15;

  const fadeOutStart = Math.max(
    growthDuration + outerDelayOffset,
    durationSec * 0.8
  );

  return (
    <div className="relative" aria-hidden>
      <motion.div
        className="absolute rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          backgroundColor: outerColor,
        }}
        initial={{
          scale: 0.5,
          opacity: 0.5,
        }}
        animate={
          shouldFadeOut
            ? {
                scale: [0.5, 1.4, 1.4, 1.4],
                opacity: [0.5, 0.5, 0.5, 0],
              }
            : {
                scale: [0.5, 1.4],
                opacity: 0.5,
              }
        }
        transition={{
          delay: delaySec + outerDelayOffset,
          duration: shouldFadeOut
            ? durationSec - outerDelayOffset
            : growthDuration,
          ease: shouldFadeOut ? "easeInOut" : "easeInOut",
          times: shouldFadeOut
            ? [
                0,
                growthDuration / (durationSec - outerDelayOffset),
                (fadeOutStart - outerDelayOffset) /
                  (durationSec - outerDelayOffset),
                1,
              ]
            : undefined,
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
          backgroundColor: innerColor,
          zIndex: 1,
        }}
        initial={{
          scale: 0.5,
          opacity: 1,
        }}
        animate={
          shouldFadeOut
            ? {
                scale: [0.5, 1, 1, 1],
                opacity: [1, 1, 1, 0],
              }
            : {
                scale: [0.5, 1],
                opacity: 1,
              }
        }
        transition={{
          delay: delaySec,
          duration: shouldFadeOut ? durationSec : growthDuration,
          ease: shouldFadeOut ? "easeOut" : "easeOut",
          times: shouldFadeOut
            ? [0, growthDuration / durationSec, fadeOutStart / durationSec, 1]
            : undefined,
        }}
      />
    </div>
  );
}
