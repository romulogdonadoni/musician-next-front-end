"use client";
import { instance } from "@/config/axiosConfig";
import PlayListContainer from "../Music/PlayListContainer";
import { PlayList } from "@/types/types";
import { getCookie, hasCookie } from "cookies-next";
import { useState } from "react";

export default function Playlist() {
  const [playlist, setPlaylist] = useState<PlayList[] | undefined>();

  if (!playlist && hasCookie("auth-token")) {
    getPlaylist();
  }

  async function getPlaylist() {
    await instance
      .get(`/get/playlist`, {
        headers: { Authorization: `Bearer ${getCookie("auth-token")}` },
      })
      .then((res) => {
        setPlaylist(res.data);
      });
  }

  return (
    <div className="flex h-0 flex-grow flex-col gap-3 overflow-hidden  overflow-y-auto p-3">
      {playlist?.map((res, index) => {
        return <PlayListContainer key={index} name={res.name} />;
      })}
    </div>
  );
}
