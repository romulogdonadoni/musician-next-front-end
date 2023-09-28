"use client";

import { MusicContext } from "@/context/MusicContext";
import Image from "next/image";
import { useContext, useRef, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import {
  FiPlayCircle,
  FiPauseCircle,
  FiSkipBack,
  FiSkipForward,
  FiFastForward,
  FiRewind,
  FiVolume,
  FiVolumeX,
  FiVolume2,
  FiVolume1,
} from "react-icons/fi";
import * as Slider from "@radix-ui/react-slider";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicContext = useContext(MusicContext);
  const [currentTrackOnList, setCurrentTrackOnList] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0);
  const volumeIcon = (volume: number) => {
    if (volume >= 0.6) {
      return <FiVolume2 size={26} />;
    } else if (volume >= 0.15) {
      return <FiVolume1 size={26} />;
    } else if (volume >= 0.01) {
      return <FiVolume size={26} />;
    } else {
      return <FiVolumeX size={26} />;
    }
  };
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
  const goToTime = (time:number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };
  const handlePause = () => {
    if (audioRef.current) {
      setIsPlay(false);
      audioRef.current?.pause();
    }
  };

  const handleVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
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
            <p className="text-xs animate-pulse">Tocando agora...</p>
            <p className="text-base">{musicContext?.music.name}</p>
            <p className="text-xs">{musicContext?.music.authorName}</p>
          </div>
        </div>
        <AiOutlineHeart size={26} color={"#FF4C29"} />
      </div>
      <div className="flex flex-1 flex-col items-center justify-between h-full">
        {/* <div className="flex items-center">
          <FiRewind size={26} />

          <FiSkipBack size={26} />
          {isPlay ? (
            <div onClick={() => handlePause()} className="cursor-pointer">
              <FiPauseCircle size={46} />
            </div>
          ) : (
            <div onClick={() => handlePlay()} className="cursor-pointer">
              <FiPlayCircle size={46} />
            </div>
          )}
          <FiSkipForward size={26} />
          <FiFastForward size={26} />
          {volumeIcon(audioVolume)}
          <Slider.Root
            className="relative flex items-center select-none touch-none w-[100px] h-5"
            defaultValue={[100]}
            onValueChange={(e) => handleVolume(e[0] * 0.01)}
            max={100}
            step={0.1}
          >
            <Slider.Track className="bg-blackA10 bg-gray-500 relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-orange rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-3 h-3 bg-orange rounded-[8px] focus:outline-none " aria-label="Volume" />
          </Slider.Root>
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
            className="relative flex items-center select-none touch-none w-[800px] h-5"
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
        </div> */}
        <audio
          ref={audioRef}
          src={musicContext?.music.musicUrl}
          onTimeUpdate={(e) => musicContext?.setCurrentTime(e.currentTarget.currentTime)}
          className="flex flex-1"
          onEnded={() => nextMusic()}
          onPlay={() => setIsPlay(true)}
          onPause={() => setIsPlay(false)}
          onVolumeChange={(e) => {
            setAudioVolume(e.currentTarget.volume);
          }}
          controls
        />
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col flex-grow h-24 ga-2 overflow-y-scroll" >
          {musicContext?.music.letter?.verses.map((res, index) => {
            return (
              <div className="flex flex-col gap-1" key={index}>
                {res.map((res, index) => {
                  return (
                    <span
                      onClick={()=> goToTime(res.time)}
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
      </div>
    </div>
  );
}
