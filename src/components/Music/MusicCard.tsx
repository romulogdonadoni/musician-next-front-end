"use client";

import { MusicContext } from "@/context/MusicContext";
import Image from "next/image";
import { useContext } from "react";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { getCookie } from "cookies-next";
import axios from "axios";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { Share1Icon, ChevronRightIcon } from "@radix-ui/react-icons";
import { FiPlayCircle } from "react-icons/fi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface MusicTrack {
  id: string;
  name: string;
  authorName: string;
  imageUrl: string;
  musicUrl: string;
  views?: number;
  letter?: { verses: [[{ time: number; word: string }]] };
}

export default function MusicCard({
  id,
  name,
  imageUrl,
  authorName,
  musicUrl,
  views,
  letter,
}: MusicTrack) {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return <div>Carregando...</div>;
  }
  const { setMusic } = musicContext;

  const handleCreateView = async (musicId: string) => {
    await axios
      .post(
        `https://musician-project-be.onrender.com/create/view/${musicId}`,
        null,
        {
          headers: { Authorization: `Bearer ${getCookie("auth-token")}` },
        },
      )
      .catch(() => {
        return;
      });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div
          onClick={() => {
            setMusic({
              name: name,
              authorName: authorName,
              imageUrl: imageUrl,
              musicUrl: musicUrl,
              letter: letter,
            });
            handleCreateView(id);
          }}
          className="group/edit flex flex-1  cursor-pointer gap-2 rounded-lg border border-silver-600 bg-black-700 p-2 duration-300 ease-in-out hover:bg-black-600  "
        >
          <div className="relative flex">
            <Image
              src={imageUrl}
              height={64}
              width={64}
              alt=""
              className="rounded"
            />
            <div className="absolute flex h-full w-full flex-1 items-center justify-center rounded bg-black bg-opacity-50 opacity-0 duration-300 ease-in-out group-hover/edit:opacity-100">
              <FiPlayCircle size={46} color={"#FF4C29"} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <Link
              href={`/music/${id}`}
              className="flex-nowrap whitespace-nowrap text-base decoration-solid hover:underline"
            >
              {name}
            </Link>
            <div className="flex items-center">
              <span className="flex-nowrap whitespace-nowrap text-xs text-gray-400">
                {authorName}
              </span>
              <BsDot color={"#9BA2AE"} />{" "}
              <span className="flex-nowrap whitespace-nowrap text-xs text-gray-400">
                Views-{views}
              </span>
            </div>
          </div>
          <div className=" flex flex-1 items-center justify-end ">
            <div className="group/favorite flex h-7 w-7 items-center justify-center">
              <div className="flex group-hover/favorite:hidden ">
                <AiOutlineStar size={26} color="#FF4C29" />
              </div>
              <div className="hidden group-hover/favorite:flex">
                <AiFillStar size={26} color="#FF4C29" />
              </div>
            </div>
          </div>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-[220px] overflow-hidden rounded-md bg-neutral-950 p-1">
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="group relative flex select-none items-center rounded-[3px] p-[10px] text-[13px] leading-none text-orange outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[highlighted]:data-[state=open]:bg-orange data-[state=open]:bg-[#ff6a4d] data-[disabled]:text-white data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
              Compartilhar
              <div className="text-mauve11 ml-auto pl-5 group-data-[disabled]:text-white group-data-[highlighted]:text-white">
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="min-w-[220px] overflow-hidden rounded-md bg-neutral-950 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                sideOffset={4}
                alignOffset={-5}
              >
                <ContextMenu.Item className="text-text-orange group relative flex  select-none items-center rounded-[3px] p-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[disabled]:text-white data-[highlighted]:text-white">
                  Copiar link da música
                  <Share1Icon className="ml-auto" />
                </ContextMenu.Item>
                <ContextMenu.Item className="text-text-orange relative flex  select-none items-center rounded-[3px] p-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[disabled]:text-white data-[highlighted]:text-white">
                  Copiar link do álbum
                  <Share1Icon className="ml-auto" />
                </ContextMenu.Item>
                <ContextMenu.Item className="text-text-orange relative flex  select-none items-center rounded-[3px] p-[10px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[disabled]:text-white data-[highlighted]:text-white">
                  Copiar link do artista
                  <Share1Icon className="ml-auto" />
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
