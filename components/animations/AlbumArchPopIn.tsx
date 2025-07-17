"use client";

import { useAnimate, stagger, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export type AlbumDataItem = {
  id: string;
  url: string;
  name: string;
  frame: "circle" | "square";
};

export interface AlbumArchPopInProps {
  albumData: AlbumDataItem[];
  duration: number;
  semicircleWidth: number;
  albumSize?: number;
  delay?: number;
  shouldEaseOut?: boolean;
}

const AlbumArchPopIn = ({
  albumData,
  duration,
  semicircleWidth,
  albumSize,
  delay,
  shouldEaseOut = true,
}: AlbumArchPopInProps) => {
  const [scope, animate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const n = albumData.length;
    const fadeDurationSeconds = shouldReduceMotion ? 0 : 0.4;
    const staggerAmountSeconds = shouldReduceMotion ? 0 : 0.06;
    const fadeInTotalSeconds =
      fadeDurationSeconds + staggerAmountSeconds * (n - 1);
    const fadeOutTotalSeconds =
      fadeDurationSeconds + staggerAmountSeconds * (n - 1);
    const totalTimeSeconds = duration / 1000;

    let pauseTime = 0;

    if (!shouldReduceMotion) {
      if (shouldEaseOut) {
        pauseTime = Math.max(
          0,
          totalTimeSeconds -
            fadeInTotalSeconds -
            fadeOutTotalSeconds -
            staggerAmountSeconds * (n - 1)
        );
      } else {
        pauseTime = Math.max(0, totalTimeSeconds - fadeInTotalSeconds);
      }
    }

    const timeout = setTimeout(
      () => {
        if (shouldEaseOut) {
          animate([
            [
              "[data-album]",
              { opacity: 1, scale: 1 },
              {
                duration: fadeDurationSeconds,
                delay: stagger(staggerAmountSeconds),
                ease: "easeOut",
              },
            ],
            [
              "[data-album]",
              { opacity: 0, scale: 0.5 },
              {
                duration: fadeDurationSeconds,
                delay: stagger(staggerAmountSeconds, {
                  startDelay: fadeInTotalSeconds + pauseTime,
                }),
                ease: "easeIn",
              },
            ],
          ]);
        } else {
          // Only fade in, no fade out
          animate([
            [
              "[data-album]",
              { opacity: 1, scale: 1 },
              {
                duration: fadeDurationSeconds,
                delay: stagger(staggerAmountSeconds),
                ease: "easeOut",
              },
            ],
          ]);
        }
      },
      shouldReduceMotion ? 0 : delay ?? 0
    ); // Skip delay if reduced motion

    return () => clearTimeout(timeout);
  }, [animate, albumData, duration, delay, shouldReduceMotion, shouldEaseOut]);

  const radius = semicircleWidth / 2;
  const centerX = semicircleWidth / 2;
  const centerY = radius;

  return (
    <div
      aria-hidden
      ref={scope}
      className="relative"
      style={{
        width: `${semicircleWidth + (albumSize || 64)}px`,
        height: `${(semicircleWidth + (albumSize || 64)) / 2}px`,
      }}
    >
      {albumData.map((item, i) => {
        const angle =
          (Math.PI * (albumData.length - i)) / (albumData.length + 1);

        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle);

        const isRounded = item.frame === "circle";
        const shapeClass = isRounded ? "rounded-full" : "rounded-sm";

        return (
          <div
            key={item.id}
            data-album
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%)`,
              opacity: 0,
            }}
          >
            <Image
              src={item.url}
              alt={item.name}
              width={albumSize || 64}
              height={albumSize || 64}
              className={`${shapeClass} shadow-md`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AlbumArchPopIn;
