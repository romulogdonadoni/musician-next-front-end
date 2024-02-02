import Image from "next/image";
import { useContext } from "react";
import { MdPlaylistPlay } from "react-icons/md";
import { SideMenuContext } from "../SideMenu/SideMenu";
import Link from "next/link";

interface PlayList {
  id: string;
  name: string;
}

export default function PlaylistCard({ name, id }: PlayList) {
  const MenuContext = useContext(SideMenuContext);
  return (
    <Link  href={`/playlist/${id}`} className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-silver-600 p-2 duration-300 ease-in-out hover:bg-black-600">
      <div className="flex items-center gap-2">
        <Image
          src={`https://ui-avatars.com/api/?name=${name}&background=181818&color=fff&size=136&bold=true`}
          alt=""
          className="h-12 w-12 rounded-lg bg-black-700"
          width={48}
          height={48}
        />
        {MenuContext?.menuOpen && <p className="whitespace-nowrap">{name}</p>}
      </div>
      {MenuContext?.menuOpen && <MdPlaylistPlay size={26} />}
    </Link>
  );
}
