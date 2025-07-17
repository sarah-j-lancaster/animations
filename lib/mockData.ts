import { AlbumDataItem } from "@/components/animations/AlbumArchPopIn";
import { FrameData } from "@/components/infographic/SequencePlayer";

export const arcAlbums: AlbumDataItem[] = [
  {
    id: "albumArt1",
    url: "/mockData/albumCovers/albumArt1.png",
    name: "Album 1",
    frame: "circle",
  },
  {
    id: "albumArt2",
    url: "/mockData/albumCovers/albumArt2.png",
    name: "Album 2",
    frame: "circle",
  },
  {
    id: "albumArt3",
    url: "/mockData/albumCovers/albumArt3.png",
    name: "Album 3",
    frame: "square",
  },
  {
    id: "albumArt4",
    url: "/mockData/albumCovers/albumArt4.png",
    name: "Album 4",
    frame: "circle",
  },
];

export const albumData: AlbumDataItem[] = [
  ...arcAlbums,
  {
    id: "albumArt5",
    url: "/mockData/albumCovers/albumArt5.png",
    name: "Album 5",
    frame: "square",
  },
  {
    id: "albumArt6",
    url: "/mockData/albumCovers/albumArt6.png",
    name: "Album 6",
    frame: "square",
  },
];

export const frames: FrameData[] = [
  {
    type: "info",
    id: "frame-1",
    duration: 2500,
    solarArc: {
      size: 90,
      startColor: "#FCFF60",
      endColor: "#facc15",
      duration: 2000,
    },
    albums: {
      albumData: arcAlbums,
      duration: 1300,
      semicircleWidth: 300,
      delay: 400,
    },
    textData: {
      text: "Early Morning",
      duration: 2000,
      delay: 0,
      color: "#FDFCFE",
    },
  },
  {
    type: "info",
    id: "frame-2",
    duration: 2500,
    solarArc: {
      size: 90,
      startColor: "#facc15",
      endColor: "#FFD25F",
      duration: 2000,
    },
    albums: {
      albumData: arcAlbums,
      duration: 1300,
      semicircleWidth: 300,
      delay: 400,
    },
    textData: {
      text: "Morning",
      duration: 2000,
      delay: 0,
      color: "#FDFCFE",
    },
  },
  {
    type: "info",
    id: "frame-3",
    duration: 2500,
    solarArc: {
      size: 90,
      startColor: "#facc15",
      endColor: "#a761ff",
      duration: 2000,
    },
    albums: {
      albumData: arcAlbums,
      duration: 1300,
      semicircleWidth: 300,
      delay: 400,
    },
    textData: {
      text: "Lunch Break",
      duration: 2000,
      delay: 0,
      color: "#FDFCFE",
    },
  },
  {
    type: "custom-user-data",
    id: "frame-4",
    duration: 2500,
    solarMotion: {
      duration: 2000,
      radius: 84,
      innerColor: "#FFD25F",
      outerColor: "#6a686f",
    },
    albums: { albumData, duration: 2000, slideDistance: 200 },
    textData: {
      text: "You are among the 5% of Morning listeners.",
      subtext: "Most listened during 9h-11h",
      duration: 2000,
      color: "#fdfcfe",
      subtextColor: "#fdfcfe",
      shouldEaseOut: false,
    },
    label: {
      text: "Morning",
      duration: 2500,
      delay: 0,
      color: "#0F0D13",
      shouldEaseOut: false,
      textSize: 32,
    },
  },
];
