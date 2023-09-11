import AlbumMusicList from "@/components/Music/AlbumMusicList";
import axios from "axios";
import Image from "next/image";

type Album = [
  {
    id: string;
    name: string;
    authorName: string;
    imageUrl: string;
    description: string;
    music: Music[];
  }
];
type Music = {
  id: string;
  name: string;
  authorName: string;
  imageUrl: string;
  musicUrl: string;
};
type Artist = {
  id: string;
  image: string;
  username: string;
};
interface AlbumProps {
  params: {
    id: string;
  };
}
export default async function Artist({ params }: AlbumProps) {
  const artist: Artist = await axios.get(`https://musician-project-be.onrender.com/get/artist/${params.id}`).then((res) => {
    return res.data;
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Image className="rounded-full" src={artist.image} height={256} width={256} alt="" />
        <div className="flex flex-col justify-center">
          <p>Artista</p>
          <p className="font-bold text-9xl">{artist.username}</p>
          <p>1.000.000 de ouvintes</p>

        </div>
      </div>
      <div className="flex flex-col gap-3">
        {/* {album[0].music.map((res, index) => {
          return <AlbumMusicList key={res.id} index={index} name={res.name} musicUrl={res.musicUrl} imageUrl={res.imageUrl} authorName={res.authorName} />;
        })} */}
      </div>
    </div>
  );
}
