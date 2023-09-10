"use client";

import React, { createContext, useState } from "react";

type MusicContextProps = {
  music: Music;
  setMusic: React.Dispatch<React.SetStateAction<Music>>;
};

type Music = {
  name: string;
  authorName: string;
  imageUrl: string;
  musicUrl: string;
};

export const MusicContext = createContext<MusicContextProps | null>({
  music: { authorName: "", imageUrl: "", musicUrl: "", name: "" },
  setMusic: () => {},
});

export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const [music, setMusic] = useState<Music>({
    name: "",
    authorName: "",
    imageUrl: "",
    musicUrl: "",
  });

  return <MusicContext.Provider value={{ music, setMusic }}>{children}</MusicContext.Provider>;
}
