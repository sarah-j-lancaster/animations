"use client";

import { motion, useTransform, useMotionValue } from "framer-motion";

export type SolarArcProps = {
  size?: number;
  radius?: number;
  startColor?: string;
  endColor?: string;
  duration?: number;
  delay?: number;
};

export function SolarArc({
  size = 90,
  radius = 300,
  startColor = "#fcff60",
  endColor = "#a761ff",
  duration = 2000,
  delay = 0,
}: SolarArcProps) {
  const rotation = useMotionValue(-90);
  const durationSec = duration / 1000;
  const pauseTime = Math.max(0, duration - 1600); // 800ms swing up + pause + 800ms swing down
  const t1 = 800 / duration;
  const t2 = (800 + pauseTime) / duration;

  const opacity = useTransform(rotation, [-90, 0, 90], [0, 1, 0]);
  const backgroundColor = useTransform(
    rotation,
    [-90, 0, 90],
    [startColor, endColor, startColor]
  );

  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        width: size,
        height: radius,
        transformOrigin: "center bottom",
        rotate: rotation,
      }}
      animate={{
        rotate: [-90, 0, 0, 90],
      }}
      transition={{
        duration: durationSec,
        delay: delay / 1000,
        ease: "easeInOut",
        times: [0, t1, t2, 1],
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor,
          position: "absolute",
          top: 0,
          left: 0,
          opacity,
        }}
      />
    </motion.div>
  );
}
