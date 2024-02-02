import AlbumMusicList from '@/components/Music/AlbumMusicList';
import ButtonPlayAlbum from '@/components/Music/ButtonPlayAlbum';
import { Album } from '@/types/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
interface AlbumProps {
  params: {
    id: string;
  };
}
export default async function Album({ params }: AlbumProps) {
  const album: Album = await axios
    .get(`https://musician-project-be.onrender.com/get/album/${params.id}`)
    .then((res) => {
      return res.data;
    });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Image className="object-cover w-64 h-64" src={album?.imageUrl} height={256} width={256} alt="" />
        <div className="flex flex-col justify-center">
          <p>Álbum</p>
          <p className="font-bold text-9xl">{album?.name}</p>
          <Link className="underline decoration-solid" href={`/artist/${album?.authorId}`}>
            {album?.authorName}
          </Link>
        </div>
      </div>
      <ButtonPlayAlbum musicList={album.music.map((res) => res.musicUrl)} />
      <table>
        <tbody className="flex flex-col gap-3">
          {album.music.map((res, index) => {
            return (
              <AlbumMusicList
                key={res.id}
                id={res.id}
                index={index}
                name={res.name}
                musicUrl={res.musicUrl}
                imageUrl={res.imageUrl}
                authorName={res.authorName}
                views={res._count.musicViews}
                musicList={album.music.map((res) => res.musicUrl)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
