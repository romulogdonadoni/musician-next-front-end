"use client";

import { MusicContext } from "@/context/MusicContext";
import Image from "next/image";
import { useContext, useRef, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicContext = useContext(MusicContext);

  useEffect(() => {
    handlePlay();
  }, [musicContext?.music.musicUrl]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div className="flex flex-grow-1 items-center justify-center h-24 min-h-24 gap-10">
      <div className="flex flex-1 bg-black-800 border border-silver-600 rounded-lg p-3 items-center">
        <div className="flex flex-1 items-center gap-3 ">
          <Image className="rounded" src={musicContext?.music.imageUrl!} width={64} height={64} alt="" />
          <div>
            <p className="text-xs animate-pulse">Tocando agora...</p>
            <p className="text-base">{musicContext?.music.name}</p>
            <p className="text-xs">{musicContext?.music.authorName}</p>
          </div>
        </div>
        <AiOutlineHeart size={26} color={"#FF4C29"} />
      </div>
      <audio className="flex flex-1" ref={audioRef} src={musicContext?.music.musicUrl} controls />
      <div className="flex flex-1"></div>
    </div>
  );
}
