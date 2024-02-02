import MusicCard from "@/components/Music/MusicCard";
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
  return (
    <div className="flex">
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
    </div>
  );
}
