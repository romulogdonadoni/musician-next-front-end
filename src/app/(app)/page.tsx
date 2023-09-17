import AlbumContainer from "@/components/Music/AlbumContainer";
import axios from "axios";
import MusicContaniner from "@/components/Music/MusicContainer";
import { Album, Artist, FavoriteMusics, Music } from "@/types/types";
import ArtistContaier from "@/components/Music/ArtistContaier";
import { cookies } from "next/headers";



export default async function App() {
  const cookiesStorage = cookies();

  const musics: Music[] = await axios
    .get("https://musician-project-be.onrender.com/get/music")
    .then((res) => {
      return res.data;
    })
    .catch(() => {return});
  
  
    const favoriteMusic: FavoriteMusics[] = await axios
    .get("https://musician-project-be.onrender.com/get/music/favorite", {
      headers: { Authorization: `Bearer ${cookiesStorage.get("auth-token")?.value}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {return});
  
  
    const albums: Album[] = await axios
    .get("https://musician-project-be.onrender.com/get/album")
    .then((res) => {
      return res.data;
    })
    .catch(() => {return});
  
  
    const artist: Artist[] = await axios
    .get("https://musician-project-be.onrender.com/get/artist")
    .then((res) => {
      return res.data;
    })
    .catch(() => {return});
  
  
  return (
    <div className="flex flex-col gap-6 pr-3">
      {cookiesStorage.has("auth-token") ? (
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">
            Suas <span className="text-orange">músicas</span> mais ouvidas
          </h1>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
            {favoriteMusic?.slice(0, 8).map((res) => (
              <MusicContaniner
                key={res.music.id}
                id={res.music.id}
                name={res.music.name}
                imageUrl={res.music.imageUrl}
                authorName={res.music.authorName}
                musicUrl={res.music.musicUrl}
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">
          As <span className="text-orange">músicas</span> mais ouvidas
        </h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
          {musics?.map((res) => (
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
          {albums?.slice(0, 8).map((res) => (
            <AlbumContainer key={res.id} id={res.id} name={res.name} imageUrl={res.imageUrl} authorName={res.authorName} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">
          Seus <span className="text-orange">artistas</span> favoritos
        </h1>
        <div className="flex gap-3">
          {artist?.slice(0, 8).map((res) => (
            <ArtistContaier key={res.id} username={res.username} image={res.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
