"use client";

import { MusicContext } from "@/context/MusicContext";
import Image from "next/image";
import { useContext, useRef, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicContext = useContext(MusicContext);
  const [currentTrackOnList, setCurrentTrackOnList] = useState(0);
  const [playlist, setPlaylist] = useState<Array<string>>([
    "http://res.cloudinary.com/dfdebqf6e/video/upload/v1694666539/Musics/oapduguwpntrz38dck4d.mp3",
    "http://res.cloudinary.com/dfdebqf6e/video/upload/v1694666508/Musics/vetzlkeaagzdvegdhfol.mp3",
    "http://res.cloudinary.com/dfdebqf6e/video/upload/v1694666497/Musics/gvnbpcjf4m4iuk0ogaj1.mp3",
  ]);
  const nextMusic = () => {
    setCurrentTrackOnList(currentTrackOnList + 1);
    if (audioRef.current?.HAVE_CURRENT_DATA) {
      audioRef.current?.play();
    }
  };

  return (
    <div className="flex flex-grow-1 items-center justify-center h-24 min-h-24 gap-10">
      <div className="flex flex-1 bg-black-800 border border-silver-600 rounded-lg p-3 items-center">
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
      <audio
        ref={audioRef}
        src={musicContext?.music.musicUrl}
        onTimeUpdate={(e) => musicContext?.setCurrentTime(e.currentTarget.currentTime)}
        className="flex flex-1"
        controls
        onEnded={() => nextMusic()}
        preload="auto"
      />

      <div className="flex flex-1">
        
      </div>
    </div>
  );
}
