import AlbumArchPopIn, {
  AlbumArchPopInProps,
} from "@/components/animations/AlbumArchPopIn";
import { SolarArc, SolarArcProps } from "@/components/animations/SolarArc";
import {
  TextLetterMotion,
  TextLetterMotionProps,
} from "@/components/animations/TextLetterMotion";

export type InfoFrameData = {
  type: "info";
  id: string;
  duration: number;
  solarArc: SolarArcProps;
  albums: AlbumArchPopInProps;
  textData: TextLetterMotionProps;
};

export function InfoFrame({ solarArc, albums, textData }: InfoFrameData) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="pt-[120px] md:pt-[150px] relative px-[40px] w-full">
        <div className="flex flex-col items-center justify-start">
          <TextLetterMotion {...textData} />
        </div>
        <div
          className="absolute z-0 left-1/2 top-0 transform -translate-x-1/2"
          style={{
            top: `-${solarArc.size}px`,
          }}
        >
          <AlbumArchPopIn {...albums} />
        </div>
        <div className="absolute z-0 w-full left-0 top-[20px]">
          <SolarArc {...solarArc} />
        </div>
      </div>
    </div>
  );
}
