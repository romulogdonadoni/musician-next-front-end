"use client";

import { useContext, useEffect, useRef, useState } from "react";
import json from "@/assets/teste.json";
import { MusicContext } from "@/context/MusicContext";
export default function TrackLetter() {
  const musicContext = useContext(MusicContext);
  useEffect(() => {
    console.log(musicContext?.currentTime);
  }, [musicContext?.currentTime]);
  return (
    <>
      <div className="flex flex-col" >
          {musicContext?.music.letter?.verses.map((res, index) => {
            return (
              <div className="flex flex-col gap-1" key={index}>
                {res.map((res, index) => {
                  return (
                    <span
                      className={`transition-all duration-300 cursor-pointer ${
                        res.time < musicContext?.currentTime! ? "text-orange" : "text-gray-500"
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
    </>
  );
}
