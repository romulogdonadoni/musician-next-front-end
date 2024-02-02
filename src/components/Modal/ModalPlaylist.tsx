"use client";
import { instance } from "@/config/axiosConfig";
import { IoClose } from "react-icons/io5";
import { MdPlaylistAdd } from "react-icons/md";
import { BsPlus } from "react-icons/bs";
import { getCookie } from "cookies-next";
import { useState } from "react";
interface ModalPlaylistProps {
  handleOpenModal: () => void;
}

export default function ModalPlaylist({ handleOpenModal }: ModalPlaylistProps) {
  const [namePlaylist, setNamePlaylist] = useState<string>("");
  const handleCreatePlaylist = async () => {
    if (namePlaylist != "") {
      await instance
        .post(
          "/create/playlist",
          { name: namePlaylist },
          { headers: { Authorization: `Bearer ${getCookie("auth-token")}` } },
        )
        .then(() => handleOpenModal());
    }
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur ">
      <div className="flex flex-col gap-2 rounded-lg border border-silver-600 bg-black-700 p-4">
        <div className="flex justify-between p-2">
          <h1 className="text-base font-bold">Criar Playlist</h1>
          <div
            onClick={() => handleOpenModal()}
            className="cursor-pointer rounded-full bg-red-500 p-1"
          >
            <IoClose size={20} />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center rounded-full border border-silver-600 p-2">
            <div className="cursor-pointer rounded-full p-1">
              <MdPlaylistAdd size={26} />
            </div>
            <input
              type="text"
              className="border-none bg-transparent p-1 outline-none"
              placeholder="Nome da sua playlist..."
              onChange={(e) => setNamePlaylist(e.target.value)}
            />
            <div
              onClick={() => handleCreatePlaylist()}
              className="cursor-pointer rounded-full bg-green-500 p-1"
            >
              <BsPlus size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
