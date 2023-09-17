"use client";

import Link from "next/link";
import Image from "next/image";
import { HiOutlinePlay } from "react-icons/hi";

interface ArtistContainerProps {
  username: string;
  image: string;
}
export default function ArtistContaier({ username, image }: ArtistContainerProps) {
  
  return (
    <div
      className="group/edit flex  flex-col bg-black-700  border border-silver-600  rounded-lg p-2 gap-2 cursor-pointer hover:bg-black-600 ease-in-out duration-300  "
    >
      <div  className="rounded-full object-cover w-32 h-32" > 

      <Image src={image} height={136} width={136} alt=""  className="rounded-full object-cover w-32 h-32"  />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="flex-nowrap whitespace-nowrap">{username}</p>
      </div>
    </div>
  );
}
