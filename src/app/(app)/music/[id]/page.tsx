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

  /* const audio = useRef<HTMLAudioElement>(null);
  const handleGoTo = (param: number) => {
    if (audio.current) {
      audio.current.currentTime = param;
    }
  };
  const [currenTimeLine, setTimeLine] = useState<number>(); */
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
      {/* <h1 className="text-xl font-bold">{json.tittle}</h1>
      <div className="flex flex-col ga-2">
        {json.letter.map((res, index) => {
          return (
            <div className="flex gap-1" key={index}>
              {res.map((res, index) => {
                return (
                  <span
                    onClick={() => handleGoTo(res.time)}
                    className={`transition-all duration-300 cursor-pointer ${
                      res.time < currenTimeLine! ? "text-orange" : "text-gray-500"
                    } hover:text-white`}
                    key={index}
                  >
                    {res.word}{" "}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <audio
        ref={audio}
        onTimeUpdate={(e) => {
          setTimeLine(e.currentTarget.currentTime);
        }}
        src="http://res.cloudinary.com/dfdebqf6e/video/upload/v1694548406/Musics/cxrumrjw7zsbki1ktntc.mp3"
        controls
      /> */}
    </div>
  );
}
