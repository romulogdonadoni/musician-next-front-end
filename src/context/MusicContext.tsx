"use client";

import React, { createContext, useState } from "react";

type MusicContextProps = {
  music: Music;
  setMusic: React.Dispatch<React.SetStateAction<Music>>;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
};

type Music = {
  name: string;
  authorName: string;
  imageUrl: string | undefined;
  musicUrl: string;
};

export const MusicContext = createContext<MusicContextProps | null>({
  music: { authorName: "", imageUrl: "", musicUrl: "", name: "" },
  setMusic: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
});

export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const [music, setMusic] = useState<Music>({
    name: "",
    authorName: "",
    imageUrl: "",
    musicUrl: "",
  });
  const [currentTime, setCurrentTime] = useState<number>(0);

  return <MusicContext.Provider value={{ music, setMusic, currentTime, setCurrentTime }}>{children}</MusicContext.Provider>;
}
