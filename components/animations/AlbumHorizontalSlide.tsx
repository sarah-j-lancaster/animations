"use client";

import { useAnimate, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export type AlbumDataItem = {
  id: string;
  url: string;
  name: string;
  frame: "circle" | "square";
};

export interface AlbumHorizontalSlideProps {
  albumData: AlbumDataItem[];
  duration: number;
  delay?: number;
  slideDistance?: number;
  albumSize?: number;
}

const AlbumHorizontalSlide = ({
  albumData,
  duration,
  delay = 0,
  slideDistance = 300,
  albumSize = 64,
}: AlbumHorizontalSlideProps) => {
  const [scope, animate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // End position: last album roughly centered
    // We want to slide left by enough to bring the last album to center
    const endX = `-${slideDistance}px`;

    const timeout = setTimeout(
      () => {
        animate(
          "[data-album-container]",
          { x: endX },
          {
            duration: shouldReduceMotion ? 0 : duration / 1000,
            ease: "easeOut",
          }
        );
      },
      shouldReduceMotion ? 0 : delay
    );

    return () => clearTimeout(timeout);
  }, [animate, albumData, duration, delay, shouldReduceMotion, slideDistance]);

  return (
    <div ref={scope} className=" w-full h-16 overflow-hidden" aria-hidden>
      <div
        data-album-container
        className="absolute flex items-center"
        style={{
          transform: "translateX(100%)",
          gap: "12px",
        }}
      >
        {albumData.map((item) => {
          const isRounded = item.frame === "circle";
          const shapeClass = isRounded ? "rounded-full" : "rounded-sm";

          return (
            <div key={item.id} className="flex-shrink-0">
              <Image
                src={item.url}
                alt={item.name}
                width={albumSize}
                height={albumSize}
                className={`${shapeClass} shadow-md`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumHorizontalSlide;
