"use client";

import { TbMusicUp } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import NavHistory from "./NavHistory";
import { getCookie, hasCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";

type UserType = {
  id: string;
  username: string;
  iat: number;
};

export default function NavBar() {
  const [user, setUser] = useState<UserType>();
  const token = getCookie("auth-token");
  const [name, setName] = useState<string>();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    hasCookie("auth-token") ? setUser(jwtDecode(token!)) : null;
  }, [token]);

  const handlePushUrl = () => {
    if (!name) {
      router.push(`/search`);
      return;
    }
    router.push(`/search/${name}`);
  };
  return (
    <nav className="flex items-center justify-between ">
      <NavHistory />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePushUrl();
          }}
          className="flex"
        >
          <div className="flex justify-center items-center h-10 w-10 rounded-l-full border-t border-b border-l border-silver-600 ">
            <FiSearch size={26} />
          </div>
          <input
            type="text"
            placeholder="Busque, músicas, álbuns, artistas ou playlists"
            className="h-10 w-[330px] rounded-r-full border-t border-b border-r border-silver-600 bg-transparent py-2 pr-4 outline-none"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-3 ">
        <Link href={"/workspace"} className="flex cursor-pointer gap-2 rounded-full bg-white px-3 py-2">
          <span className="font-bold text-orange">Criar Álbum</span>
          <TbMusicUp size={26} color={"#FF4C29"} />
        </Link>
        <Link
          href={"/auth/login"}
          className="flex cursor-pointer gap-2 rounded-full px-3 py-2"
        >
          <span className="font-bold text-orange">
            {user?.username ? user.username : "Entrar"}
          </span>

          <CgProfile size={26} color={"#FF4C29"} />
        </Link>
      </div>
    </nav>
  );
}
