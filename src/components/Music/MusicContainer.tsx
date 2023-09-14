"use client";

import { HiOutlinePlay } from "react-icons/hi";
import { MusicContext } from "@/context/MusicContext";
import Image from "next/image";
import { useContext, useState } from "react";
import { BsDot } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";

interface MusicTrack {
  id: string;
  name: string;
  authorName: string;
  imageUrl: string;
  musicUrl: string;
  views: number;
}

export default function MusicContainer({ id, name, imageUrl, authorName, musicUrl, views }: MusicTrack) {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return <div>Carregando...</div>;
  }
  const { setMusic } = musicContext;

  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MGYyOTU3LTA3MjMtNDYwMi1hOGFjLWMxMWNhYjVhNDc2MyIsImlhdCI6MTY5NDYyMjQ5N30.8XcT4G0n-wyt4t1RI7wKlAqt6cXRQKMrQ0IvQ8TRqjk",
  };
  const handleCreateView = async (musicId: string) => {
    await axios.post(`https://musician-project-be.onrender.com/create/view/${musicId}`, null, { headers });
  };

  return (
    <div
      onClick={() => {
        handleCreateView(id);
        setMusic({
          name: name,
          authorName: authorName,
          imageUrl: imageUrl,
          musicUrl: musicUrl,
        });
      }}
      className="group/edit flex flex-1  bg-black-700 border border-silver-600 rounded-lg p-2 gap-2 cursor-pointer hover:bg-black-600 ease-in-out duration-300  "
    >
      <Image src={imageUrl} height={64} width={64} alt="" className="rounded " />
      <div className="flex flex-col justify-center">
        <Link href={`/music/${id}`} className="flex-nowrap whitespace-nowrap text-base hover:underline decoration-solid">
          {name}
        </Link>
        <div className="flex items-center">
          <span className="flex-nowrap whitespace-nowrap text-xs text-gray-400">{authorName}</span>
          <BsDot color={"#9BA2AE"} /> <span className="flex-nowrap whitespace-nowrap text-xs text-gray-400">Views-{views}</span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end opacity-0 group-hover/edit:opacity-100 ease-in-out duration-300">
        <HiOutlinePlay size={46} color={"#FF4C29"} />
      </div>
    </div>
  );
}
