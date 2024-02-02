'use client';

import React, { createContext, useEffect, useState } from 'react';

type MusicContextProps = {
  music: Music;
  setMusic: React.Dispatch<React.SetStateAction<Music>>;
  switchMusic: (arg0: string[], arg1: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handlePlayPause: () => void;
  handleVolume: (arg0: number) => void;
  handleChangeTrackTimeline: (arg0: number) => void;
  currentTime: number;
  currentDuration: number;
  currentTrackIndex: number;
  isPlay: boolean;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
};

type Music = {
  name: string;
  authorName: string;
  imageUrl: string | undefined;
  musicUrl: string;
  letter?: { verses: [[{ time: number; word: string }]] };
};

export const MusicContext = createContext<MusicContextProps | null>({
  music: {
    authorName: '',
    imageUrl: '',
    musicUrl: '',
    name: '',
    letter: { verses: [[{ time: 0, word: '' }]] },
  },
  switchMusic: () => {},
  setMusic: () => {},
  handleNext: () => {},
  handlePrevious: () => {},
  handlePlayPause: () => {},
  handleVolume: () => {},
  handleChangeTrackTimeline: () => {},
  currentTime: 0,
  currentDuration: 0,
  currentTrackIndex: 0,
  isPlay: false,
  setCurrentTime: () => {},
});
export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const [mySound, setMySound] = useState<HTMLAudioElement>();

  useEffect(() => {
    setMySound(new Audio());
  }, []);

  const [music, setMusic] = useState<Music>({
    name: '',
    authorName: '',
    imageUrl: '',
    musicUrl: '',
    letter: { verses: [[{ time: 0, word: '' }]] },
  });

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentDuration, setCurrentDuration] = useState<number>(0);

  const [musicList, setMusicList] = useState<Array<string>>();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);

  if (!mySound) {
    return;
  }

  const switchMusic = (src: string[], index: number) => {
    setMusicList(src);
    setCurrentTrackIndex(index);
    mySound.src = src[index ? index : 0];
    mySound.play();
  };
  const handleChangeTrackTimeline = (time: number) => {
    mySound.currentTime = (time * mySound.duration) / 100;
  };

  mySound.onended = () => {
    if (currentTrackIndex > musicList?.length!) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setCurrentTrackIndex(0);
      switchMusic(musicList!, 0);
      return;
    }
    switchMusic(musicList!, currentTrackIndex + 1);
  };

  const handleNext = () => {
    if (currentTrackIndex >= musicList?.length! - 1) {
      return;
    }
    setCurrentTrackIndex(currentTrackIndex + 1);
    switchMusic(musicList!, currentTrackIndex + 1);
  };

  const handlePrevious = () => {
    if (currentTrackIndex <= 0) {
      return;
    }
    setCurrentTrackIndex(currentTrackIndex - 1);
    switchMusic(musicList!, currentTrackIndex - 1);
  };

  const handlePlayPause = () => {
    if (mySound.paused) {
      mySound.play();
    } else {
      mySound.pause();
    }
  };
  const handleVolume = (value: number) => {
    mySound.volume = value;
  };

  mySound.onplay = () => {
    setIsPlay(true);
  };
  mySound.onpause = () => {
    setIsPlay(false);
  };

  mySound.ontimeupdate = () => {
    setCurrentTime(mySound.currentTime);
    setCurrentDuration(mySound.duration);
  };

  return (
    <MusicContext.Provider
      value={{
        music,
        setMusic,
        setCurrentTime,
        currentTime,
        switchMusic,
        currentTrackIndex,
        currentDuration,
        isPlay,
        handleNext,
        handlePrevious,
        handlePlayPause,
        handleVolume,
        handleChangeTrackTimeline,
      }}>
      {children}
    </MusicContext.Provider>
  );
}
