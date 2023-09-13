"use client";
import json from "@/assets/teste.json";
import { useRef, useState } from "react";

export default function Music() {
  const audio = useRef<HTMLAudioElement>(null);
  const handleGoTo = (param:number) => {
    if (audio.current) {
      audio.current.currentTime = param;
    }
  };
  const [currenTimeLine, setTimeLine] = useState<number>();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">{json.tittle}</h1>
      <div className="flex flex-col ga-2">
        {json.letter.map((res, index) => {
          return (
            <div className="flex gap-1" key={index}>
              {res.map((res, index) => {
                return (
                  <span
                    onClick={() => handleGoTo(res.time)}
                    className={`transition-all duration-300 cursor-pointer ${
                      res.time < currenTimeLine! ? "text-orange" : "text-gray-500"
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

      <audio
        ref={audio}
        onTimeUpdate={(e) => {
          console.log(e.currentTarget.currentTime);
          setTimeLine(e.currentTarget.currentTime);
        }}
        src="http://res.cloudinary.com/dfdebqf6e/video/upload/v1694548406/Musics/cxrumrjw7zsbki1ktntc.mp3"
        controls
      />
    </div>
  );
}
