import { render, screen, act } from "@testing-library/react";
import { SequencePlayer } from "./SequencePlayer";

jest.useFakeTimers();

const infoFrame = {
  type: "info" as const,
  id: "frame-1",
  duration: 100,
  solarArc: {
    size: 90,

    duration: 700,
  },
  albums: {
    albumData: [],
    duration: 300,
    semicircleWidth: 300,
    delay: 400,
  },
  textData: {
    text: "Early Morning",
    duration: 300,
  },
};

const customFrame = {
  type: "custom-user-data" as const,
  id: "frame-4",
  duration: 1000,
  solarMotion: {
    duration: 700,
    radius: 84,
  },
  albums: { albumData: [], duration: 2000, slideDistance: 200 },
  textData: {
    text: "You are among the 5% of Morning listeners.",
    subtext: "Most listened during 9h-11h",
    duration: 2000,
  },
  label: {
    text: "Lunch",
    duration: 2500,
    delay: 0,
  },
};

describe("SequencePlayer", () => {
  it("renders the first frame initially", () => {
    render(<SequencePlayer frames={[infoFrame, customFrame]} />);
    expect(
      screen.getByText(/Frame 1 of 2 : Early Morning/)
    ).toBeInTheDocument();
  });

  it("advances to the next frame after the duration", () => {
    render(<SequencePlayer frames={[infoFrame, customFrame]} />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText("Frame 2 of 2")).toBeInTheDocument();
  });

  it("shows ARIA live region text", () => {
    render(<SequencePlayer frames={[infoFrame]} />);
    expect(screen.getByText(/Frame 1 of 1/)).toBeInTheDocument();
  });

  it("renders fallback when no frames are provided", () => {
    render(<SequencePlayer frames={[]} />);
    expect(screen.getByText(/no content available/i)).toBeInTheDocument();
  });
});
