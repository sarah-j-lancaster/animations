import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FrameData } from "@/components/infographic/SequencePlayer";

export function useSequencePlayback(frames: FrameData[]) {
  const shouldReduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (frames.length === 0) return;

    if (shouldReduceMotion) {
      setCurrent(frames.length - 1);
      return;
    }

    if (current < frames.length - 1) {
      const timeout = setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, frames[current].duration);

      return () => clearTimeout(timeout);
    }
  }, [current, frames, shouldReduceMotion]);

  return {
    current,
    currentFrame: frames[current],
  };
}
