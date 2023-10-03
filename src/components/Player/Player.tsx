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
import {PiMicrophoneStage} from "react-icons/pi"

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
  const goToTime = (time: number) => {
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
    <div className="flex-grow-1 min-h-24 flex h-24 items-center justify-center gap-10">
      <div className="flex flex-1 items-center rounded-lg border border-silver-600 bg-black-800 p-3">
        <div className="flex flex-1 items-center gap-3 ">
          {musicContext?.music.imageUrl == "" ? (
            <div className="h-16 w-16 rounded-lg bg-black-700"></div>
          ) : (
            <Image
              className="rounded"
              src={musicContext?.music.imageUrl!}
              width={64}
              height={64}
              alt=""
            />
          )}
          <div>
            <p className="animate-pulse text-xs">Tocando agora...</p>
            <p className="text-base">{musicContext?.music.name}</p>
            <p className="text-xs">{musicContext?.music.authorName}</p>
          </div>
        </div>
        <AiOutlineHeart size={26} color={"#FF4C29"} />
      </div>
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="grid grid-cols-3 items-center justify-between">
          <div className="flex items-center justify-start"></div>

          <div className="flex items-center justify-center">
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
          </div>

          <div className="flex items-center justify-end">
            {volumeIcon(audioVolume)}
            <input
              type="range"
              defaultValue={100}
              onChange={(e) =>
                handleVolume(e.currentTarget.valueAsNumber * 0.01)
              }
              step={0.1}
            />
          </div>
        </div>
        <div className="flex gap-4">
          {Math.floor(audioRef.current?.currentTime! / 60)
            .toString()
            .padStart(2, "0")}
          {":"}
          {Math.floor(audioRef.current?.currentTime! % 60)
            .toString()
            .padStart(2, "0")}

          <input
            type="range"
            value={
              (audioRef.current?.currentTime! * 100) /
              audioRef.current?.duration!
            }
            max={100}
            step={0.1}
            defaultValue={0}
              className="flex flex-1"

          />

          {Math.floor(audioRef.current?.duration! / 60)
            .toString()
            .padStart(2, "0")}
          {":"}
          {Math.floor(audioRef.current?.duration! % 60)
            .toString()
            .padStart(2, "0")}
        </div>
        <audio
          ref={audioRef}
          src={musicContext?.music.musicUrl}
          onTimeUpdate={(e) =>
            musicContext?.setCurrentTime(e.currentTarget.currentTime)
          }
          className="flex flex-1"
          onEnded={() => nextMusic()}
          onPlay={() => setIsPlay(true)}
          onPause={() => setIsPlay(false)}
          onVolumeChange={(e) => {
            setAudioVolume(e.currentTarget.volume);
          }}
        />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <PiMicrophoneStage size={26}/>
        <div className="ga-2 flex h-24 flex-grow flex-col overflow-y-scroll">
          {musicContext?.music.letter?.verses.map((res, index) => {
            return (
              <div className="flex flex-col gap-1" key={index}>
                {res.map((res, index) => {
                  return (
                    <span
                      onClick={() => goToTime(res.time)}
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
      </div>
    </div>
  );
}
