import PlayListContainer from "../Music/PlayListContainer";
import axios from "axios";
import { PlayList } from "@/types/types";
import { cookies } from "next/headers";

export default async function Playlist() {
  const cookiesStorage = cookies();
  if (!cookiesStorage.get("token")?.value) {
    return <div className=" p-3">Entre para ver sua biblioteca.</div>;
  }
  const playlist: PlayList[] = await axios
    .get(`https://musician-project-be.onrender.com/get/playlist`, {
      headers: {
        Authorization: cookiesStorage.get("token")?.value,
      },
    })
    .then((res) => {
      return res.data;
    });
  return (
    <div className="flex flex-col flex-grow gap-3 overflow-y-auto h-0  p-3">
      {playlist.map((res, index) => {
        return <PlayListContainer key={index} name={res.name} />;
      })}
    </div>
  );
}
