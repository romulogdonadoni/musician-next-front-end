import AlbumMusicList from "@/components/Music/AlbumMusicList";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {BsPlay} from "react-icons/bs"

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
  _count: { musicViews: number };
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

      <table className="flex flex-col gap-3">
        <th className="flex">
          <td className="flex items-center justify-center p-3 rounded-full bg-black-700 border border-silver-600 cursor-pointer hover:bg-black-600 ease-in-out duration-300"><BsPlay size={26} color={"#FF4C29"}/></td>
        </th>
        {album[0].music.map((res, index) => {
          return (
            <AlbumMusicList
              key={res.id}
              index={index}
              name={res.name}
              musicUrl={res.musicUrl}
              imageUrl={res.imageUrl}
              authorName={res.authorName}
              views={res._count.musicViews}
            />
          );
        })}
      </table>
    </div>
  );
}
