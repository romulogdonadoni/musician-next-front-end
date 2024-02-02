import AlbumContainer from "@/components/Music/AlbumCard";
import axios from "axios";
import MusicCard from "@/components/Music/MusicCard";
import { Album, Artist, FavoriteMusics, Music } from "@/types/types";
import ArtistContaier from "@/components/Music/ArtistCard";
import { cookies } from "next/headers";

export default async function App() {
  const cookiesStorage = cookies();

  const musics: Music[] = await axios
    .get("https://musician-project-be.onrender.com/get/music")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return;
    });

  const favoriteMusic: FavoriteMusics[] = cookiesStorage.has("auth-token")
    ? await axios
        .get("https://musician-project-be.onrender.com/get/music/favorite", {
          headers: { Authorization: `Bearer ${cookiesStorage.get("auth-token")?.value}` },
        })
        .then((res) => {
          return res.data;
        })
        .catch(() => {
          return;
        })
    : null;

  const albums: Album[] = await axios
    .get("https://musician-project-be.onrender.com/get/album")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return;
    });

  const artist: Artist[] = await axios
    .get("https://musician-project-be.onrender.com/get/artist")
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return;
    });

  return (
    <div className="flex flex-1 flex-col gap-6">
      {cookiesStorage.has("auth-token") ? (
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">
            Suas <span className="text-orange">músicas</span> mais ouvidas
          </h1>
          <div
            className="
            gap-4
            grid
            2xl:grid-cols-4
            xl:grid-cols-3
            lg:grid-cols-2
            sm:grid-cols-1
            "
          >
            {favoriteMusic?.slice(0, 8).map((res) => (
              <MusicCard
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
      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-xl font-bold">
          As <span className="text-orange">músicas</span> mais ouvidas
        </h1>
        <div
          className="
            gap-4
            grid
            2xl:grid-cols-4
            xl:grid-cols-3
            lg:grid-cols-2
            sm:grid-cols-1
            "
        >
          {musics?.map((res) => (
            <MusicCard
              key={res.id}
              id={res.id}
              name={res.name}
              imageUrl={res.imageUrl}
              authorName={res.authorName}
              musicUrl={res.musicUrl}
              views={res._count.musicViews}
              letter={res.letter}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-xl font-bold">
          Seus <span className="text-orange">álbuns</span> mais ouvidos
        </h1>
        <div className="flex flex-wrap gap-3">
          {albums?.map((res) => (
            <AlbumContainer key={res.id} id={res.id} name={res.name} imageUrl={res.imageUrl} authorName={res.authorName} />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-xl font-bold">
          Seus <span className="text-orange">artistas</span> favoritos
        </h1>
        <div className="flex flex-wrap gap-3">
          {artist?.map((res) => (
            <ArtistContaier key={res.id} id={res.id} username={res.username} image={res.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
