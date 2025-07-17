"use client";
import { SequencePlayer } from "@/components/infographic/SequencePlayer";
import { frames } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen bg-grey flex items-center justify-center">
      <div className="relative w-full max-w-sm h-[100vh] min-h-[600px] mx-auto bg-black overflow-hidden">
        <SequencePlayer frames={frames} />
      </div>
    </main>
  );
}
