"use client";

import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { TbMusicUp } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center ">
      <div className="flex gap-2 p-2">
        <div onClick={() => window.history.back()} className="cursor-pointer">
          <BiChevronLeftCircle size={26} />
        </div>
        <div onClick={() => window.history.forward()} className="cursor-pointer">
          <BiChevronRightCircle size={26} />
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <div className="flex gap-2 py-2 px-3 bg-white rounded-full cursor-pointer">
          <span className="text-orange font-bold">Criar Álbum</span>
          <TbMusicUp size={26} color={"#FF4C29"} />
        </div>
        <Link href={"/auth/login"} className="flex gap-2 py-2 px-3 rounded-full cursor-pointer">
          <span className="text-orange font-bold">{"Entrar"}</span>
          <CgProfile size={26} color={"#FF4C29"} />
        </Link>
      </div>
    </nav>
  );
}
