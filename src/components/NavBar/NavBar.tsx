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
import Image from "next/image";

type UserType = {
  id: string;
  username: string;
  image: string;
  iat: number;
};

export default function NavBar() {
  const [user, setUser] = useState<UserType>();
  const token = getCookie("auth-token");
  const [name, setName] = useState<string>();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    hasCookie("auth-token") && setUser(jwtDecode(token!));
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
          <div className="flex h-10 w-10 items-center justify-center rounded-l-full border-b border-l border-t border-silver-600 ">
            <FiSearch size={26} />
          </div>
          <input
            type="text"
            placeholder="Busque, músicas, álbuns, artistas ou playlists"
            className="h-10 w-[330px] rounded-r-full border-b border-r border-t border-silver-600 bg-transparent py-2 pr-4 outline-none"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-3 ">
        <Link
          href={"/workspace"}
          className="flex h-8 w-8 cursor-pointer items-center justify-center gap-2 rounded-full bg-white"
        >
          <TbMusicUp size={20} color={"#FF4C29"} />
        </Link>

        <Link href={"/auth/login"}>
          {user ? (
            <Image
              src={user?.image}
              className="flex h-12 w-12 cursor-pointer rounded-full object-cover"
              alt=""
              height={40}
              width={40}
            />
          ) : (
            <span className="font-bold text-orange">Entrar</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
