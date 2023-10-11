"use client";
import { instance } from "@/config/axiosConfig";
import PlaylistCard from "../Music/PlaylistCard";
import { Playlist } from "@/types/types";
import { getCookie, hasCookie } from "cookies-next";
import { useState } from "react";

export default function PlaylistNav() {
  const [playlist, setPlaylist] = useState<Playlist[] | undefined>();

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
        return <PlaylistCard key={index} id={res.id} name={res.name}  />;
      })}
    </div>
  );
}
