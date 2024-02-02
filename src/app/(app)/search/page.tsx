import AlbumContainer from "@/components/Music/AlbumCard";
import ArtistContaier from "@/components/Music/ArtistCard";
import MusicCard from "@/components/Music/MusicCard";
import { Album, Artist, Music } from "@/types/types";
import axios from "axios";
type Search = {
  music: [Music];
  album: [Album];
  artist: [Artist];
};
export default async function Search() {
  const searchResult: Search = await axios
    .get(`https://musician-project-be.onrender.com/search`)
    .then((res) => {
      return res.data;
    });
  return (
    <div>
      <div className="flex flex-1 flex-col gap-3">
        <h1 className="text-xl font-bold">
          As top <span className="text-orange">globais</span>
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
          {searchResult?.music?.map((res) => (
            <MusicCard
              key={res.id}
              id={res.id}
              name={res.name}
              imageUrl={res.imageUrl}
              authorName={res.authorName}
              musicUrl={res.musicUrl}
              letter={res.letter}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">
          Seus <span className="text-orange">álbuns</span> mais ouvidos
        </h1>
        <div className="flex flex-wrap gap-3">
          {searchResult?.album?.slice(0, 8).map((res) => (
            <AlbumContainer key={res.id} id={res.id} name={res.name} imageUrl={res.imageUrl} authorName={res.authorName} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-bold">
          Seus <span className="text-orange">artistas</span> favoritos
        </h1>
        <div className="flex flex-wrap gap-3">
          {searchResult?.artist?.slice(0, 8).map((res) => (
            <ArtistContaier key={res.id} id={res.id} username={res.username} image={res.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
