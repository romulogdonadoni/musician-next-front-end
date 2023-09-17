import { instance } from "@/config/axiosConfig";
import PlayListContainer from "../Music/PlayListContainer";
import { PlayList } from "@/types/types";
import axios from "axios";
import { cookies } from "next/headers";

export default async function Playlist() {
  const cookiesStorage = cookies();
  if (!cookiesStorage.has("auth-token")) {
    return <div className="flex flex-col flex-grow gap-3 overflow-y-auto h-0  p-3">Entre para ver sua biblioteca</div>;
  }

  /* const playlist: PlayList[] = await axios
    .get(`https://musician-project-be.onrender.com/get/playlist`, {
      headers: {
        Authorization: `Bearer ${cookiesStorage.get("token")?.value}`,
      },
    })
    .then((res) => {
      return res.data;
    }); */

  const playlist: PlayList[] = await instance
    .get(`/get/playlist`, { headers: { Authorization: `Bearer ${cookiesStorage.get("auth-token")?.value}` } })
    .then((res) => {
      return res.data;
    });
  console.log(playlist);
  return (
    <div className="flex flex-col flex-grow gap-3 overflow-y-auto h-0  p-3">
      {playlist.map((res, index) => {
        return <PlayListContainer key={index} name={res.name} />;
      })}
    </div>
  );
}
