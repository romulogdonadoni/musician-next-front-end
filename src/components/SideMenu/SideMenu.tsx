"use client";

import { GoHome } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import Link from "next/link";
import Playlist from "./Playlist";
import ModalPlaylist from "../Modal/ModalPlaylist";
import { HiPlusSm } from "react-icons/hi";
import { useState } from "react";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(!open);
  };
  return (
    <aside className="flex flex-col w-96 gap-3">
      <div className=" bg-black-800 rounded-lg">
        <Link href={"/"} className="flex flex-row items-center gap-2 p-3 hover:text-orange rounded-lg ease-in-out duration-300 cursor-pointer">
          <GoHome size={26} />
          <span className="font-bold">Home</span>
        </Link>
        <div className="flex flex-row items-center gap-2 p-3 hover:text-orange rounded-lg ease-in-out duration-300 cursor-pointer">
          <BiSearch size={26} />
          <span className="font-bold">Search</span>
        </div>
      </div>
      {open ? <ModalPlaylist handleOpenModal={handleOpenModal} /> : <></>}
      <div className="flex flex-1 flex-col bg-black-800 rounded-lg">
        <div className="flex items-center justify-between p-3">
          <div className=" flex items-center gap-3">
            <RiNeteaseCloudMusicLine size={26} />
            <span className="font-bold">Your Library</span>
          </div>
          <div
            onClick={() => {
              handleOpenModal();
            }}
            className="hover:bg-black-600 ease-in-out duration-300 rounded-full cursor-pointer"
          >
            <HiPlusSm size={26} />
          </div>
        </div>
        <Playlist />
      </div>
    </aside>
  );
}
