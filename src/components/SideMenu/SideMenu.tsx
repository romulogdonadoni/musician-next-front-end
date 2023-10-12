"use client";

import { FiSearch, FiHome, FiMusic, FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import PlaylistNav from "./PlaylistNav";
import ModalPlaylist from "../Modal/ModalPlaylist";
import { createContext, useState } from "react";
import { CgMenuRound } from "react-icons/cg";

type SideMenuContextType = {
  menuOpen: boolean;
};
export const SideMenuContext = createContext<SideMenuContextType | null>({
  menuOpen: false,
});

export default function SideMenu() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <SideMenuContext.Provider value={{ menuOpen }}>
      <aside
        className={`flex ${
          menuOpen ? "w-[420px]" : "w-[100px]"
        } flex-col gap-3 transition-all duration-300 ease-in-out`}
      >
        <div className=" rounded-lg bg-black-800">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex cursor-pointer flex-row flex-nowrap items-center gap-2 rounded-lg p-3 duration-300 ease-in-out hover:text-orange"
          >
            <CgMenuRound size={26} />
          </div>
          <Link
            href={"/"}
            className="flex cursor-pointer flex-row flex-nowrap items-center gap-2 rounded-lg p-3 duration-300 ease-in-out hover:text-orange"
          >
            <div className="h-[26px] w-[26px]">
              <FiHome size={26} />
            </div>
            <span className={`font-bold ${menuOpen ? "flex" : "hidden"}`}>
              Início
            </span>
          </Link>
          <Link
            href={"/search"}
            className="flex cursor-pointer flex-row flex-nowrap items-center gap-2 rounded-lg p-3 duration-300 ease-in-out hover:text-orange"
          >
            <div className="h-[26px] w-[26px]">
              <FiSearch size={26} />
            </div>
            <span className={`font-bold ${menuOpen ? "flex" : "hidden"}`}>
              Procurar
            </span>
          </Link>
        </div>
        {modalOpen ? (
          <ModalPlaylist handleOpenModal={handleOpenModal} />
        ) : (
          <></>
        )}
        <div className="flex flex-1 flex-col rounded-lg bg-black-800">
          <div className=" flex items-center justify-between">
            <div className="flex cursor-pointer flex-row flex-nowrap items-center gap-2 rounded-lg p-3 duration-300 ease-in-out hover:text-orange">
              <div className="h-[26px] w-[26px]">
                <FiMusic size={26} />
              </div>
              <span
                className={`font-bold ${
                  menuOpen ? "flex" : "hidden"
                } whitespace-nowrap`}
              >
                Sua Biblioteca
              </span>
            </div>
            <div
              onClick={() => {
                handleOpenModal();
              }}
              className="p-3"
            >
              <div className="cursor-pointer rounded-full duration-300 ease-in-out hover:bg-black-600">
                <FiPlusCircle size={26} />
              </div>
            </div>
          </div>
          <PlaylistNav />
        </div>
      </aside>
    </SideMenuContext.Provider>
  );
}
