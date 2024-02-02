"use client";
import { useContext, useEffect } from "react";
import { MusicContext } from "@/context/MusicContext";

interface TrackLetterProps{
  letter?: { verses: [[{ time: number; word: string }]] };
}
export default function TrackLetter({letter}:TrackLetterProps) {
  const musicContext = useContext(MusicContext);
  return (
    <div className="flex flex-col">
      {letter?.verses.map((res, index) => {
        return (
          <div className="flex flex-col gap-1" key={index}>
            {res.map((res, index) => {
              return (
                <span
                  className={`cursor-pointer transition-all duration-300 ${
                    res.time < musicContext?.currentTime!
                      ? "text-orange"
                      : "text-gray-500"
                  } hover:text-white`}
                  key={index}
                >
                  {res.word}{" "}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
