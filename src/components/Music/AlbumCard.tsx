"use client";

import Image from "next/image";
import Link from "next/link";


interface AlbumContainer {
  id: string;
  name: string;
  authorName: string;
  imageUrl: string;
}
export default function AlbumContainer({ id, name, imageUrl, authorName }: AlbumContainer) {

  return (
    <Link
      href={`/album/${id}`}
      className="group/edit flex  flex-col bg-black-700  border border-silver-600  rounded-lg p-2 gap-2 cursor-pointer hover:bg-black-600 ease-in-out duration-300  "
    >
      <div className="rounded-full object-cover w-32 h-32">
        <Image src={imageUrl} height={136} width={136} alt="" className="rounded object-cover w-32 h-32"  />
      </div>
      <div className="flex flex-col justify-center">
        <p className="flex-nowrap whitespace-nowrap">{name}</p>
        <p className="flex-nowrap whitespace-nowrap text-xs text-gray-400">{authorName}</p>
      </div>
    </Link>
  );
}
