'use client';

import Link from 'next/link';
import NavHistory from './NavHistory';
import { getCookie, hasCookie, deleteCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type UserType = {
  id: string;
  username: string;
  image: string;
  iat: number;
};

export default function NavBar() {
  const [user, setUser] = useState<UserType>();
  const token = getCookie('auth-token');
  const [name, setName] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    hasCookie('auth-token') && setUser(jwtDecode(token!));
  }, [token]);

  const handlePushUrl = () => {
    if (!name) {
      router.push(`/search`);
      return;
    }
    router.push(`/search/${name}`);
  };
  return (
    <nav className="flex items-center justify-between sticky top-0 left-0 backdrop-blur-lg p-4 z-10 rounded-tl-lg">
      <NavHistory />
      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePushUrl();
          }}
          className="flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-l-full border-b border-l border-t border-silver-600 bg-neutral-800">
            <FiSearch size={26} />
          </div>
          <input
            type="text"
            placeholder="Busque, músicas, álbuns, artistas ou playlists"
            className="h-10 w-[330px] rounded-r-full border-b border-r border-t border-silver-600  py-2 pr-4 outline-none bg-neutral-800"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-3 ">
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              {user.image ? (
                <Image
                  src={user?.image}
                  className="flex h-10 w-10 cursor-pointer rounded-full object-cover"
                  alt=""
                  height={40}
                  width={40}
                  quality={100}
                />
              ) : (
                <Image
                  src={`https://ui-avatars.com/api/?name=${user?.username}&background=random&color=fff&size=40&bold=true`}
                  height={40}
                  width={40}
                  alt=""
                  quality={100}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="w-[200px] rounded-lg border border-silver-600 bg-neutral-950 p-2 z-20"
                sideOffset={5}
                align="end">
                <DropdownMenu.Group>
                  <DropdownMenu.Item className="text-white">Perfil</DropdownMenu.Item>
                  <DropdownMenu.Item className="text-white">Configurações</DropdownMenu.Item>
                  <DropdownMenu.Item className="text-white">
                    <Link href={'/workspace'}>
                      <span className="text-white">Meus Álbuns</span>
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="cursor-pointer text-white">
                    <span
                      className="font-bold text-orange"
                      onClick={() => {
                        window.location.reload();
                        deleteCookie('auth-token');
                      }}>
                      Sair
                    </span>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <Link href={'/auth/login'}>
            <span className="font-bold text-orange">Entrar</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
