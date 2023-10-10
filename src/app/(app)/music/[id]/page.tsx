import CommentCard from "@/components/Music/CommentCard";
import TrackLetter from "@/components/Music/TrackLetter";
import { Music } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FiPlayCircle } from "react-icons/fi";

interface MusicProps {
  params: {
    id: string;
  };
}

export default async function Music({ params }: MusicProps) {
  const music: Music = await axios
    .get(`https://musician-project-be.onrender.com/get/music/${params.id}`)
    .then((res) => {
      return res.data;
    });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <Image
          className="h-64 w-64 object-cover"
          src={music?.imageUrl}
          height={256}
          width={256}
          alt=""
        />
        <div className="flex flex-col justify-center">
          <p>Música</p>
          <p className="text-9xl font-bold">{music?.name}</p>
          <Link
            className="underline decoration-solid"
            href={`/album/${music?.authorId}`}
          >
            {music?.authorName}
          </Link>
        </div>
      </div>
      <div className="text-[#FF4C29]">
        <FiPlayCircle size={46} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start">
          {/* <video
            src="https://res.cloudinary.com/dfdebqf6e/video/upload/v1696466962/BALAZUL_-_Mateca_Teto_z4ifte.mp4"
            autoPlay
            muted
            className="w-full opacity-10"
          /> */}
          <TrackLetter />
        </div>
        <div className="flex flex-col gap-2">
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  );
}
