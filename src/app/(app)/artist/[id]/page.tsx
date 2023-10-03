import { Artist } from "@/types/types";
import axios from "axios";
import Image from "next/image";


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
      {artist.image ? (
          <Image className="rounded-full object-cover w-64 h-64" src={artist.image} height={512} width={512} quality={100} alt="" />
        ) : (
          <Image
            src={`https://ui-avatars.com/api/?name=${artist.username}&background=random&color=fff&size=512&bold=true`}
            height={512}
            width={512}
            alt=""
            quality={100}
            className="h-64 w-64 rounded-full object-cover"
          />
        )}
        
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
