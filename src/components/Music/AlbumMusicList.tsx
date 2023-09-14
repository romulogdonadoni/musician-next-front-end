"use client";

import { MusicContext } from "@/context/MusicContext";
import { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";

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
      className="grid grid-cols-3 p-3 rounded-lg bg-black-700 border border-silver-600 cursor-pointer hover:bg-black-600 ease-in-out duration-300"
    >
      <td className="flex gap-2">
        <BsFillPlayFill size={26} color={"#FF4C29"} />
        {index + 1}-{name}
      </td>
      <td>Tocada {views} vezes</td>
      <td className="flex justify-end gap-2">
        <AiOutlineHeart size={26} color={"#FF4C29"} />
        <span>03:11</span>
        <BiDotsHorizontalRounded size={26} />
      </td>
    </tr>
  );
}
