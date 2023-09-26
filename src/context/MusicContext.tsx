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
  letter?: { verses: [[{ time: number; word: string }]] };
};

export const MusicContext = createContext<MusicContextProps | null>({
  music: { authorName: "", imageUrl: "", musicUrl: "", name: "", letter: { verses: [[{ time: 0, word: "" }]] }},
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
    letter: { verses: [[{ time: 0, word: "" }]] }
  });
  const [currentTime, setCurrentTime] = useState<number>(0);

  return <MusicContext.Provider value={{ music, setMusic, currentTime, setCurrentTime }}>{children}</MusicContext.Provider>;
}