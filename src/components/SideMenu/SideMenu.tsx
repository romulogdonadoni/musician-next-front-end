"use client";

import { FiSearch, FiHome, FiMusic } from "react-icons/fi";
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
    <aside className="flex w-105 flex-col gap-3">
      <div className=" rounded-lg bg-black-800">
        <Link
          href={"/"}
          className="flex cursor-pointer flex-row items-center gap-2 rounded-lg p-3 duration-300 ease-in-out hover:text-orange"
        >
          <FiHome size={26} />
          <span className="font-bold">Home</span>
        </Link>
        <Link href={"/search"} className="flex cursor-pointer flex-row items-center gap-2 rounded-lg p-3 duration-300 ease-in-out hover:text-orange">
          <FiSearch size={26} />
          <span className="font-bold">Search</span>
        </Link>
      </div>
      {open ? <ModalPlaylist handleOpenModal={handleOpenModal} /> : <></>}
      <div className="flex flex-1 flex-col rounded-lg bg-black-800">
        <div className=" flex items-center justify-between p-3">
          <div className=" flex items-center gap-3">
            <FiMusic size={26} />
            <span className="font-bold">Your Library</span>
          </div>
          <div
            onClick={() => {
              handleOpenModal();
            }}
            className="cursor-pointer rounded-full duration-300 ease-in-out hover:bg-black-600"
          >
            <HiPlusSm size={26} />
          </div>
        </div>
        <Playlist />
      </div>
    </aside>
  );
}
