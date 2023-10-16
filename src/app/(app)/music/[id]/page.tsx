import CommentInput from '@/components/Comment/CommentInput';
import CommentCard from '@/components/Music/CommentCard';
import TrackLetter from '@/components/Music/TrackLetter';
import { Music } from '@/types/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlayCircle } from 'react-icons/fi';

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
        <Image className="h-64 w-64 object-cover" src={music?.imageUrl} height={256} width={256} alt="" />
        <div className="flex flex-col justify-center">
          <p>Música</p>
          <p className="text-9xl font-bold">{music?.name}</p>
          <Link className="underline decoration-solid" href={`/album/${music?.authorId}`}>
            {music?.authorName}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 items-start">
          <div className="text-[#FF4C29]">
            <FiPlayCircle size={46} />
          </div>
          <h1>Letra</h1>
          <TrackLetter letter={music?.letter} />
        </div>
        <div className="flex flex-col gap-2">
          <CommentCard key={music?.id} name={music?.authorName} image={music?.imageUrl} comment={music?.description} />
          <CommentInput musicId={params.id}/>
          {music?.comment?.reverse().map((res) => <CommentCard key={res.id} name={res.user.username} image={res.user.image} comment={res.comment} />)}
        </div>
      </div>
    </div>
  );
}
