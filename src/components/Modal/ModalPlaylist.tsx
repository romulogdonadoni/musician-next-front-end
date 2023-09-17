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
        .post("/create/playlist", { name: namePlaylist }, { headers: { Authorization: `Bearer ${getCookie("auth-token")}` } })
        .then(() => handleOpenModal());
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 bg-opacity-50 bg-black backdrop-blur z-10 h-screen w-screen ">
      <div className="flex flex-col bg-black-700 border border-silver-600 p-4 gap-2 rounded-lg">
        <div className="flex justify-between p-2">
          <h1 className="font-bold text-base">Criar Playlist</h1>
          <div onClick={() => handleOpenModal()} className="bg-red-500 rounded-full p-1 cursor-pointer">
            <IoClose size={20} />
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center p-2 rounded-full border border-silver-600">
            <div className="rounded-full p-1 cursor-pointer">
              <MdPlaylistAdd size={26} />
            </div>
            <input
              type="text"
              className="bg-transparent border-none outline-none p-1"
              placeholder="Nome da sua playlist..."
              onChange={(e) => setNamePlaylist(e.target.value)}
            />
            <div onClick={() => handleCreatePlaylist()} className="bg-green-500 rounded-full p-1 cursor-pointer">
              <BsPlus size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
