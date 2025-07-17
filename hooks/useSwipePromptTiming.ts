import { useEffect, useState } from "react";
import { FrameData } from "@/components/infographic/SequencePlayer";
import { useReducedMotion } from "framer-motion";

interface UseSwipePromptTimingProps {
  current: number;
  frames: FrameData[];
}

export function useSwipePromptTiming({
  current,
  frames,
}: UseSwipePromptTimingProps) {
  const [showSwipePrompt, setShowSwipePrompt] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      if (current === frames.length - 1) {
        setShowSwipePrompt(true);
      }
      return;
    }

    if (current === frames.length - 1) {
      const promptTimeout = setTimeout(() => {
        setShowSwipePrompt(true);
      }, Math.max(0, frames[current].duration - 500));

      return () => clearTimeout(promptTimeout);
    } else {
      setShowSwipePrompt(false);
    }
  }, [current, frames, shouldReduceMotion]);

  return showSwipePrompt;
}
