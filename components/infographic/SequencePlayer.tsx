"use client";

import { InfoFrameData, InfoFrame } from "./layouts/InfoFrame";
import {
  CustomUserDataFrameProps,
  CustomUserDataFrame,
} from "./layouts/CustomUserDataFrame";
import { SwipeUpPrompt } from "../animations/SwipeUpPrompt";
import { useSwipePromptTiming } from "@/hooks/useSwipePromptTiming";
import { useSequencePlayback } from "@/hooks/useSequencePlayback";
import { MotionConfig } from "framer-motion";

export type FrameData = InfoFrameData | CustomUserDataFrameProps;

type SequencePlayerProps = {
  frames: FrameData[];
};

export function SequencePlayer({ frames }: SequencePlayerProps) {
  const { current, currentFrame } = useSequencePlayback(frames);

  const showSwipePrompt = useSwipePromptTiming({ current, frames });

  if (frames.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        No content available.
      </div>
    );
  }

  const renderFrame = (frame: FrameData) => {
    return frame.type === "info" ? (
      <InfoFrame key={frame.id} {...frame} />
    ) : (
      <CustomUserDataFrame key={frame.id} {...frame} />
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-full h-full">
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Frame {current + 1} of {frames.length}{" "}
          {currentFrame.type === "info"
            ? `: ${currentFrame.textData.text}`
            : ""}
        </div>
        {renderFrame(currentFrame)}
        {showSwipePrompt && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <SwipeUpPrompt />
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
