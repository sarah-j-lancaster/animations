import AlbumHorizontalSlide, {
  AlbumHorizontalSlideProps,
} from "@/components/animations/AlbumHorizontalSlide";
import {
  SolarMotion,
  SolarMotionProps,
} from "@/components/animations/SolarMotion";
import {
  TextWordMotion,
  TextWordMotionProps,
} from "@/components/animations/TextWordMotion";
import {
  TextLetterMotion,
  TextLetterMotionProps,
} from "@/components/animations/TextLetterMotion";

export type CustomUserDataFrameProps = {
  type: "custom-user-data";
  id: string;
  duration: number;
  solarMotion: SolarMotionProps;
  albums: AlbumHorizontalSlideProps;
  textData: TextWordMotionProps;
  label: TextLetterMotionProps;
};

export function CustomUserDataFrame({
  solarMotion,
  albums,
  textData,
  label,
}: CustomUserDataFrameProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="pt-[120px] sm:pt-[150px] relative px-[45px]">
        <div className="absolute z-20 w-full left-0 top-0 transform -translate-y-1/2">
          <div className="flex flex-col items-center justify-start">
            <TextLetterMotion {...label} />
          </div>
        </div>
        <TextWordMotion {...textData} />
        <div>
          <div className="absolute z-0 w-full left-0 top-0 transform -translate-y-1/2">
            <AlbumHorizontalSlide {...albums} />
          </div>
          <div
            className="absolute z-10 w-full left-0"
            style={{
              top: `-${solarMotion.radius}px`,
              left: `-${solarMotion.radius}px`,
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <SolarMotion {...solarMotion} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
