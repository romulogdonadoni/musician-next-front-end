"use client";

import { TbMusicUp } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import NavHistory from "./NavHistory";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

type UserType = {
  id: string;
  username: string;
  iat: number;
};

export default function NavBar() {
  const [user, setUser] = useState<UserType>();
  const token = getCookie("auth-token");

  useEffect(() => {
    setUser(jwtDecode(token!));
  }, [token]);

  return (
    <nav className="flex justify-between items-center ">
      <NavHistory />
      <div className="flex items-center gap-3 ">
        <div className="flex gap-2 py-2 px-3 bg-white rounded-full cursor-pointer">
          <span className="text-orange font-bold">Criar Álbum</span>
          <TbMusicUp size={26} color={"#FF4C29"} />
        </div>
        <Link href={"/auth/login"} className="flex gap-2 py-2 px-3 rounded-full cursor-pointer">
          <span className="text-orange font-bold">{user?.username ? user.username : "Entrar"}</span>

          <CgProfile size={26} color={"#FF4C29"} />
        </Link>
      </div>
    </nav>
  );
}
