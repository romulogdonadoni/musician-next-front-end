import AlbumMusicList from "@/components/Music/AlbumMusicList";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type Album = [
  {
    id: string;
    name: string;
    authorName: string;
    authorId: string;
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
interface AlbumProps {
  params: {
    id: string;
  };
}
export default async function Album({ params }: AlbumProps) {

  const album: Album = await axios.get(`https://musician-project-be.onrender.com/get/album/${params.id}`).then((res) => {
    return res.data;
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Image src={album[0]?.imageUrl} height={256} width={256} alt="" />
        <div className="flex flex-col justify-center">
          <p>Álbum</p>
          <p className="font-bold text-9xl">{album[0]?.name}</p>
          <Link className="underline decoration-solid" href={`/artist/${album[0]?.authorId}`}>
            {album[0]?.authorName}
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {album[0].music.map((res, index) => {
          return (
            <AlbumMusicList key={res.id} index={index} name={res.name} musicUrl={res.musicUrl} imageUrl={res.imageUrl} authorName={res.authorName} />
          );
        })}
      </div>
    </div>
  );
}
