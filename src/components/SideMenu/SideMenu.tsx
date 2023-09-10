import { GoHome } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import Link from "next/link";

export default function SideMenu() {
  return (
    <aside className="flex flex-col w-80 gap-3">
      <div className=" bg-black-800 p-3 rounded-lg">
        <Link href={"/"} className="flex flex-row items-center gap-2 p-3 hover:text-orange rounded-lg ease-in-out duration-300 cursor-pointer">
          <GoHome size={26} />
          <span className="font-bold">Início</span>
        </Link>
        <div className="flex flex-row items-center gap-2 p-3 hover:text-orange rounded-lg ease-in-out duration-300 cursor-pointer">
          <BiSearch size={26} />
          <span className="font-bold">Buscar</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-black-800 p-3 rounded-lg">
        <div className="flex flex-row items-center gap-2 p-3">
          <RiNeteaseCloudMusicLine size={26} />
          <span className="font-bold">Sua Biblioteca</span>
        </div>
      </div>
    </aside>
  );
}
