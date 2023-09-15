import TrackLetter from "@/components/Music/TrackLetter";
import { Music } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface MusicProps {
  params: {
    id: string;
  };
}

export default async function Music({ params }: MusicProps) {
  const music: Music = await axios.get(`https://musician-project-be.onrender.com/get/music/${params.id}`).then((res) => {
    return res.data;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <Image src={music?.imageUrl} height={256} width={256} alt="" />
        <div className="flex flex-col justify-center">
          <p>Música</p>
          <p className="font-bold text-9xl">{music?.name}</p>
          <Link className="underline decoration-solid" href={`/album/${music?.authorId}`}>
            {music?.authorName}
          </Link>
        </div>
      </div>
      <h1>{music.name}</h1>
      <TrackLetter />
    </div>
  );
}
