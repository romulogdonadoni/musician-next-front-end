'use client';

import { MusicContext } from '@/context/MusicContext';
import { useContext } from 'react';
import { FiPlayCircle } from 'react-icons/fi';

interface ButtonPlayAlbumProps {
  musicList: Array<string>;
}

export default function ButtonPlayAlbum({ musicList }: ButtonPlayAlbumProps) {
  const musicContext = useContext(MusicContext);
  if (!musicContext) {
    return <div>Carregando...</div>;
  }
  const { setMusic, switchMusic } = musicContext;
  return (
    <div
      onClick={() => {
        switchMusic(musicList, 0);
      }}
      className=" text-orange cursor-pointer">
      <FiPlayCircle size={52} />
    </div>
  );
}
