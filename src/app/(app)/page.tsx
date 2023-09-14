import AlbumContainer from "@/components/Album/AlbumContainer";
import axios from "axios";
import MusicContaniner from "@/components/Music/MusicContainer";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { Album, Music } from "@/types/types";

export default async function App() {
  const session = await getServerSession(nextAuthOptions);
  const musics: Music[] = await axios.get("https://musician-project-be.onrender.com/get/music").then((res) => {
    return res.data;
  });
  const albums: Album[] = await axios.get("https://musician-project-be.onrender.com/get/album").then((res) => {
    return res.data;
  });

  return (
    <div className="flex flex-col gap-6">
      <h1>{session?.user.username}</h1>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">
          Suas <span className="text-orange">músicas</span> mais ouvidas
        </h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
          {musics.map((res) => (
            <MusicContaniner
              key={res.id}
              id={res.id}
              name={res.name}
              imageUrl={res.imageUrl}
              authorName={res.authorName}
              musicUrl={res.musicUrl}
              views={res._count.musicViews}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">
          Seus <span className="text-orange">álbuns</span> mais ouvidos
        </h1>
        <div className="flex gap-3">
          {albums.slice(0, 8).map((res) => (
            <AlbumContainer key={res.id} id={res.id} name={res.name} imageUrl={res.imageUrl} authorName={res.authorName} />
          ))}
        </div>
      </div>
    </div>
  );
}
