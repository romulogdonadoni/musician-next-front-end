"use client";

import { MusicContext } from "@/context/MusicContext";
import { useContext } from "react";

interface MusicTrackAlbum {
  index: number;
  name: string;
  musicUrl: string;
  imageUrl: string;
  authorName: string;
  views: number;
}
export default function AlbumMusicList({ name, index, musicUrl, imageUrl, authorName, views }: MusicTrackAlbum) {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return <div>Carregando...</div>;
  }
  const { setMusic } = musicContext;
  return (
    <tr
      onClick={() =>
        setMusic({
          name: name,
          authorName: authorName,
          imageUrl: imageUrl,
          musicUrl: musicUrl,
        })
      }
      className="grid grid-cols-2 p-3 rounded-lg bg-black-700 border border-silver-600 cursor-pointer hover:bg-black-600 ease-in-out duration-300"
    >
      <td>{index + 1}-{name}</td>
      <td>Tocada {views} vezes</td>
    </tr>
  );
}
