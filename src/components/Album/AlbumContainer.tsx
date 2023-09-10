"use client";

import { HiOutlinePlay } from "react-icons/hi";
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
      className="group/edit flex  flex-col bg-black-700  border border-silver-600  rounded-lg p-2 gap-2 cursor-pointer hover:bg-neutral-600 ease-in-out duration-300  "
    >
      <Image src={imageUrl} height={136} width={136} alt="" className="rounded " />
      <div className="flex flex-col justify-center">
        <p className="flex-nowrap whitespace-nowrap">{name}</p>
        <p className="flex-nowrap whitespace-nowrap">{authorName}</p>
      </div>
      <div className="flex flex-1 items-center justify-end opacity-0 group-hover/edit:opacity-100 ease-in-out duration-300">
        <HiOutlinePlay size={46} color={"#FF4C29"} />
      </div>
    </Link>
  );
}
