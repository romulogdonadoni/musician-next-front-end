'use client';

import { MusicContext } from '@/context/MusicContext';
import Link from 'next/link';
import { useContext } from 'react';
import { TiStarOutline } from 'react-icons/ti';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';
interface MusicTrackAlbum {
  id: string;
  index: number;
  name: string;
  musicUrl: string;
  imageUrl: string;
  authorName: string;
  views?: number;
  musicList: Array<string>;
}
export default function AlbumMusicList({
  id,
  name,
  index,
  musicUrl,
  imageUrl,
  authorName,
  views,
  musicList,
}: MusicTrackAlbum) {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return <div>Carregando...</div>;
  }

  const { setMusic, currentTrackIndex, switchMusic, isPlay } = musicContext;

  return (
    <tr
      onClick={() => {
        setMusic({
          name: name,
          authorName: authorName,
          imageUrl: imageUrl,
          musicUrl: musicUrl,
        });
        switchMusic(musicList, index);
      }}
      className={`group/track grid grid-cols-3 p-3 rounded-lg ${
        currentTrackIndex == index && isPlay ? 'bg-orange hover:bg-orange-100' : 'bg-black-700 hover:bg-black-600'
      }   border border-silver-600 cursor-pointer  ease-in-out duration-300`}>
      <td className="flex justify-start items-center">
        <div
          className={`hidden group-hover/track:flex w-8 h-8 justify-center items-center ${
            currentTrackIndex == index && isPlay ? 'text-white' : 'text-orange'
          }`}>
          <BsFillPlayFill size={26} />
        </div>
        <div className="flex group-hover/track:hidden w-8 h-8 justify-center items-center">{index + 1}</div>
        <Link
          href={`/music/${id}`}
          className="flex-nowrap whitespace-nowrap text-base hover:underline decoration-solid">
          {name}
        </Link>
      </td>
      <td className="flex items-center">Tocada {views} vezes</td>
      <td
        className={`flex justify-end gap-2 items-center ${currentTrackIndex == index && isPlay ? 'text-white' : 'text-orange'}`}>
        <TiStarOutline size={26} />
        <span>03:11</span>
        <BiDotsHorizontalRounded size={26} />
      </td>
    </tr>
  );
}
