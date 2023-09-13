import { GoHome } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { HiPlusSm } from "react-icons/hi";
import Link from "next/link";
import PlayListContainer from "../Music/PlayListContainer";
import axios from "axios";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc1MGYyOTU3LTA3MjMtNDYwMi1hOGFjLWMxMWNhYjVhNDc2MyIsImlhdCI6MTY5NDYyMjQ5N30.8XcT4G0n-wyt4t1RI7wKlAqt6cXRQKMrQ0IvQ8TRqjk";
type PlayList = {
  name: string;
};

export default async function SideMenu() {
  const playlist: PlayList[] = await axios
    .get(`https://musician-project-be.onrender.com/get/playlist`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    });
  console.log(playlist);
  return (
    <aside className="flex flex-col w-96 gap-3">
      <div className=" bg-black-800 p-3 rounded-lg">
        <Link href={"/"} className="flex flex-row items-center gap-2 p-3 hover:text-orange rounded-lg ease-in-out duration-300 cursor-pointer">
          <GoHome size={26} />
          <span className="font-bold">Home</span>
        </Link>
        <div className="flex flex-row items-center gap-2 p-3 hover:text-orange rounded-lg ease-in-out duration-300 cursor-pointer">
          <BiSearch size={26} />
          <span className="font-bold">Search</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-black-800 p-3 rounded-lg">
        <div className="flex items-center justify-between p-3">
          <div className=" flex items-center gap-3">
            <RiNeteaseCloudMusicLine size={26} />
            <span className="font-bold">Your Library</span>
          </div>
          <div className="hover:bg-black-600 ease-in-out duration-300 rounded-full cursor-pointer">
            <HiPlusSm size={26} />
          </div>
        </div>
        <div className="flex flex-col flex-grow gap-3 overflow-y-auto h-0">
          {playlist.map((res, index) => {
            return <PlayListContainer key={index} name={res.name} />;
          })}
        </div>
      </div>
    </aside>
  );
}
