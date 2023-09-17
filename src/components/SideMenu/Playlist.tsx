"use client";
import { instance } from "@/config/axiosConfig";
import PlayListContainer from "../Music/PlayListContainer";
import { PlayList } from "@/types/types";
import { getCookie, hasCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Playlist() {
  const [playlist, setPlaylist] = useState<PlayList[] | undefined>();

  if (!playlist) {
    getPlaylist();
  }

  async function getPlaylist() {
    await instance.get(`/get/playlist`, { headers: { Authorization: `Bearer ${getCookie("auth-token")}` } }).then((res) => {
      setPlaylist(res.data);
    });
  }

  return (
    <div className="flex flex-col flex-grow gap-3 overflow-y-auto h-0  p-3">
      {playlist?.map((res, index) => {
        return <PlayListContainer key={index} name={res.name} />;
      })}
    </div>
  );
}
