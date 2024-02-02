import Image from "next/image";
import Link from "next/link";

interface ArtistContainerProps {
  id : string;
  username: string;
  image: string | null;
}
export default function ArtistContaier({
  id,
  username,
  image,
}: ArtistContainerProps) {
  return (
    <Link href={`/artist/${id}`} className="group/edit flex  cursor-pointer flex-col  gap-2 rounded-lg  border border-silver-600 bg-black-700 p-2 duration-300 ease-in-out hover:bg-black-600  ">
      <div className="h-32 w-32 rounded-full object-cover">
        {image ? (
          <Image
            src={image}
            height={136}
            width={136}
            alt=""
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <Image
            src={`https://ui-avatars.com/api/?name=${username}&background=random&color=fff&size=136&bold=true`}
            height={136}
            width={136}
            alt=""
            quality={100}
            className="h-32 w-32 rounded-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="flex-nowrap whitespace-nowrap">{username}</p>
      </div>
    </Link>
  );
}
