"use client";

import { MusicContext } from "@/context/MusicContext";
import Image from "next/image";
import { useContext, useRef, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiPlayCircle, FiPauseCircle } from "react-icons/fi";
import * as Slider from "@radix-ui/react-slider";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicContext = useContext(MusicContext);
  const [currentTrackOnList, setCurrentTrackOnList] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  const nextMusic = () => {
    setCurrentTrackOnList(currentTrackOnList + 1);
    if (audioRef.current) {
      audioRef.current?.play();
    }
  };
  const handlePlay = () => {
    if (audioRef.current) {
      setIsPlay(true);
      audioRef.current?.play();
    }
  };
  const handlePause = () => {
    if (audioRef.current) {
      setIsPlay(false);
      audioRef.current?.pause();
    }
  };
  useEffect(() => {
    if (audioRef.current?.HAVE_CURRENT_DATA) {
      audioRef?.current?.play();
    }
  }, [musicContext?.music.musicUrl]);

  return (
    <div className="flex flex-grow-1 items-center justify-center h-24 min-h-24 gap-10">
      <div className="flex  bg-black-800 border border-silver-600 w-105 rounded-lg p-3 items-center">
        <div className="flex flex-1 items-center gap-3 ">
          {musicContext?.music.imageUrl == "" ? (
            <div className="w-16 h-16 bg-black-700 rounded-lg"></div>
          ) : (
            <Image className="rounded" src={musicContext?.music.imageUrl!} width={64} height={64} alt="" />
          )}
          <div>
            <p className="text-xs animate-pulse">Playing now...</p>
            <p className="text-base">{musicContext?.music.name}</p>
            <p className="text-xs">{musicContext?.music.authorName}</p>
          </div>
        </div>
        <AiOutlineHeart size={26} color={"#FF4C29"} />
      </div>


      <div className="flex flex-1 flex-col items-center justify-between">
        <div>
          {isPlay ? (
            <div onClick={() => handlePause()} className="cursor-pointer">
              <FiPauseCircle size={46} />
            </div>
          ) : (
            <div onClick={() => handlePlay()} className="cursor-pointer">
              <FiPlayCircle size={46} />
            </div>
          )}
        </div>
        <div className="flex gap-4">
          {Math.floor(audioRef.current?.currentTime! / 60)
            .toString()
            .padStart(2, "0")}
          {":"}
          {Math.floor(audioRef.current?.currentTime! % 60)
            .toString()
            .padStart(2, "0")}

          <Slider.Root
            className="relative flex items-center select-none touch-none w-[200px] h-5"
            defaultValue={[0]}
            value={[(audioRef.current?.currentTime! * 100) / audioRef.current?.duration!]}
            max={100}
            step={0.1}
          >
            <Slider.Track className="bg-blackA10 relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-white rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
              aria-label="Volume"
            />
          </Slider.Root>

          {Math.floor(audioRef.current?.duration! / 60)
            .toString()
            .padStart(2, "0")}
          {":"}
          {Math.floor(audioRef.current?.duration! % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </div>
      <div className="flex flex-1">
        <audio
          ref={audioRef}
          src={musicContext?.music.musicUrl}
          onTimeUpdate={(e) => musicContext?.setCurrentTime(e.currentTarget.currentTime)}
          className="flex flex-1"
          onEnded={() => nextMusic()}
        />
      </div>
    </div>
  );
}
