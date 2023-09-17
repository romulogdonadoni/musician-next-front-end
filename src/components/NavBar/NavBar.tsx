
import { TbMusicUp } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import NavHistory from "./NavHistory";
import { cookies } from "next/headers";
export default function NavBar() {
  const cookiesStorage = cookies();
  return (
    <nav className="flex justify-between items-center ">
      <NavHistory />
      <div className="flex items-center gap-3 ">
        <div className="flex gap-2 py-2 px-3 bg-white rounded-full cursor-pointer">
          <span className="text-orange font-bold">Criar Álbum</span>
          <TbMusicUp size={26} color={"#FF4C29"} />
        </div>
        <Link href={"/auth/login"} className="flex gap-2 py-2 px-3 rounded-full cursor-pointer">
          {cookiesStorage.has("auth-token") ? (
            <span className="text-orange font-bold">{"Sair"}</span>
          ) : (
            <span className="text-orange font-bold">{"Entrar"}</span>
          )}

          <CgProfile size={26} color={"#FF4C29"} />
        </Link>
      </div>
    </nav>
  );
}
