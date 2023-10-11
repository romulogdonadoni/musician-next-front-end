import ButtonPlayAlbum from '@/components/Music/ButtonPlayAlbum';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
interface PlaylistProps {
  params: {
    id: string;
  };
}
export default async function Playlist({ params }: PlaylistProps) {
  /* const album: Album = await axios
    .get(`https://musician-project-be.onrender.com/get/album/${params.id}`)
    .then((res) => {
      return res.data;
    }); */

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Image className="object-cover w-64 h-64" src={`https://ui-avatars.com/api/?name=${"00"}&background=181818&color=fff&size=256&bold=true`} height={256} width={256} alt="" />
        <div className="flex flex-col justify-center">
          <p>Playlist</p>
          <p className="font-bold text-9xl">{"00"}</p>
          <Link className="underline decoration-solid" href={""}>
            {""}
          </Link>
        </div>
      </div>
      {/* <ButtonPlayAlbum musicList={""} /> */}
      <table>
        <tbody className="flex flex-col gap-3">
          
        </tbody>
      </table>
    </div>
  );
}
