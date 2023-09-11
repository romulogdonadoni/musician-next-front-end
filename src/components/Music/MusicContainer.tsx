"use client";

import { HiOutlinePlay } from "react-icons/hi";
import { MusicContext } from "@/context/MusicContext";
import Image from "next/image";
import { useContext, useState } from "react";

interface MusicTrack {
  name: string;
  authorName: string;
  imageUrl: string;
  musicUrl: string;
}
export default function MusicContainer({ name, imageUrl, authorName, musicUrl }: MusicTrack) {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return <div>Carregando...</div>;
  }
  const { setMusic } = musicContext;
  return (
    <div
      onClick={() =>
        setMusic({
          name: name,
          authorName: authorName,
          imageUrl: imageUrl,
          musicUrl: musicUrl,
        })
      }
      className="group/edit flex flex-1  bg-black-700 border border-silver-600 rounded-lg p-2 gap-2 cursor-pointer hover:bg-black-600 ease-in-out duration-300  "
    >
      <Image src={imageUrl} height={64} width={64} alt="" className="rounded " />
      <div className="flex flex-col justify-center">
        <p className="flex-nowrap whitespace-nowrap text-base">{name}</p>
        <p className="flex-nowrap whitespace-nowrap text-xs">{authorName}</p>
      </div>
      <div className="flex flex-1 items-center justify-end opacity-0 group-hover/edit:opacity-100 ease-in-out duration-300">
        <HiOutlinePlay size={46} color={"#FF4C29"} />
      </div>
    </div>
  );
}
