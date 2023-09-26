import AlbumMusicList from "@/components/Music/AlbumMusicList";
import { Album, Artist, Music } from "@/types/types";
import axios from "axios";

interface SearchProps {
  params: {
    name: string;
  };
}
type Search = {
  music: [Music];
  album: [Album];
  artist: [Artist];
};
export default async function Search({ params }: SearchProps) {
  const searchResult: Search = await axios
    .get(`https://musician-project-be.onrender.com/search/${params.name}`)
    .then((res) => {
      return res.data;
    });
  console.log(searchResult);
  return (
    <div>
      <table>
        <tbody className="flex flex-col gap-3">
          {searchResult.music.map((res, index) => {
            return (
              <AlbumMusicList
                key={res.id}
                id={res.id}
                index={index}
                name={res.name}
                musicUrl={res.musicUrl}
                imageUrl={res.imageUrl}
                authorName={res.authorName}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
