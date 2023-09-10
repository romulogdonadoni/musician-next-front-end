"use client";

import { MusicContext } from "@/context/MusicContext";
import { useContext } from "react";

interface MusicTrackAlbum {
  index: number;
  name: string;
  musicUrl: string;
  imageUrl: string;
  authorName: string;
}
export default function AlbumMusicList({ name, index, musicUrl, imageUrl, authorName }: MusicTrackAlbum) {
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
      className="flex p-3 rounded-lg bg-black-700 border border-silver-600 cursor-pointer hover:bg-neutral-600 ease-in-out duration-300"
    >
      <p>{index + 1}-</p>
      <p>{name}</p>
    </div>
  );
}
