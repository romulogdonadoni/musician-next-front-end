import AlbumContainer from '@/components/Music/AlbumCard';
import { instance } from '@/config/axiosConfig';
import { Album } from '@/types/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { FiPlusCircle } from 'react-icons/fi';

export default async function Workspace() {
  const cookiesStorage = cookies();
  const album: Album[] = cookiesStorage.has('auth-token')
    ? await instance
        .get('/get/self/album', {
          headers: { Authorization: `Bearer ${cookiesStorage.get('auth-token')?.value}` },
        })
        .then((res) => {
          return res.data;
        })
        .catch(() => {
          return;
        })
    : null;
  console.log(album);
  return (
    <div className="flex flex-col gap-4">
      <Link href={'/workspace/create'} className="flex gap-2 items-center">
        <div className="flex justify-center items-center bg-orange rounded-full p-1 w-9 h-9 cursor-pointer">
          <FiPlusCircle size={34} />
        </div>
        <p className="font-bold text-sm">Criar álbum</p>
      </Link>
      <div className="flex gap-4">
        {album?.map((res) => (
          <AlbumContainer
            key={res.id}
            id={res.id}
            authorName={res.authorName}
            name={res.name}
            imageUrl={res.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
