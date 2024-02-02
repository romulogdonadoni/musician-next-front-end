'use client';

import { MusicContext } from '@/context/MusicContext';
import Image from 'next/image';
import { useContext } from 'react';
import { BsDot } from 'react-icons/bs';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { PlusIcon ,Share1Icon, ChevronRightIcon } from '@radix-ui/react-icons';
import { FiPlayCircle } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import SilverDisk from '../../../public/icons/opticaldiscicon.svg';

interface MusicTrack {
  id: string;
  name: string;
  authorName: string;
  imageUrl: string;
  musicUrl: string;
  views?: number;
  letter?: { verses: [[{ time: number; word: string }]] };
}

export default function MusicCard({ id, name, imageUrl, authorName, musicUrl, views, letter }: MusicTrack) {
  const musicContext = useContext(MusicContext);

  if (!musicContext) {
    return <div>Carregando...</div>;
  }
  const { setMusic, switchMusic } = musicContext;

  const handleCreateView = async (musicId: string) => {
    await axios
      .post(`https://musician-project-be.onrender.com/create/view/${musicId}`, null, {
        headers: { Authorization: `Bearer ${getCookie('auth-token')}` },
      })
      .catch(() => {
        return;
      });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div className="group/edit flex flex-1  cursor-pointer gap-2 rounded-lg border border-silver-600 bg-black-700 p-2 duration-300 ease-in-out hover:bg-black-600  ">
          <div
            onClick={() => {
              switchMusic([musicUrl], 0);
              setMusic({
                name: name,
                authorName: authorName,
                imageUrl: imageUrl,
                musicUrl: musicUrl,
                letter: letter,
              });
              handleCreateView(id);
            }}
            className="relative flex">
            <Image src={imageUrl} height={64} width={64} alt="" className="min-w-[64px] min-h-[64px] object-cover rounded" />
            <div className="absolute flex h-full w-full flex-1 items-center justify-center rounded bg-black bg-opacity-50 opacity-0 duration-300 ease-in-out group-hover/edit:opacity-100">
              <FiPlayCircle size={46} color={'#FF4C29'} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Link
                href={`/music/${id}`}
                className="flex flex-1 overflow-hidden text-ellipsis whitespace-nowrap leading-5 decoration-solid hover:underline">
                {name}
              </Link>
              <span className="flex-nowrap whitespace-nowrap text-xs leading-3 text-gray-400">{authorName}</span>
            </div>
            <div className="flex flex-nowrap gap-1 whitespace-nowrap text-xs text-gray-400">
              <Image src={SilverDisk} width={16} height={16} alt="" />
              <span>Tocada {views} Vezes </span>
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
        <ContextMenu.Content className="min-w-[220px] overflow-hidden rounded-lg border-silver-600 border bg-neutral-950 p-2">
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className="group relative flex cursor-pointer select-none items-center rounded-lg p-2 text-[13px] leading-none text-white outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[highlighted]:data-[state=open]:bg-orange data-[state=open]:bg-[#ff6a4d] data-[disabled]:text-white data-[highlighted]:data-[state=open]:text-white data-[highlighted]:text-white data-[state=open]:text-white">
              Compartilhar
              <div className="text-mauve11 ml-auto pl-5 group-data-[disabled]:text-white group-data-[highlighted]:text-white">
                <ChevronRightIcon />
              </div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Item className="text-text-orange group relative flex cursor-pointer select-none items-center rounded-lg p-2 text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[disabled]:text-white data-[highlighted]:text-white">
                  Adcionar a playlist
                  <PlusIcon className="ml-auto" />
                </ContextMenu.Item>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className="min-w-[220px] overflow-hidden border-silver-600 border rounded-md bg-neutral-950 p-2"
                sideOffset={8}
                alignOffset={-8}>
                <ContextMenu.Item className="text-text-orange group relative flex cursor-pointer select-none items-center rounded-lg p-2 text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[disabled]:text-white data-[highlighted]:text-white">
                  Copiar link da música
                  <Share1Icon className="ml-auto" />
                </ContextMenu.Item>
                <ContextMenu.Item className="text-text-orange relative flex cursor-pointer select-none items-center rounded-lg p-2 text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[disabled]:text-white data-[highlighted]:text-white">
                  Copiar link do álbum
                  <Share1Icon className="ml-auto" />
                </ContextMenu.Item>
                <ContextMenu.Item className="text-text-orange relative flex cursor-pointer select-none items-center rounded-lg p-2 text-[13px] leading-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-orange data-[disabled]:text-white data-[highlighted]:text-white">
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
