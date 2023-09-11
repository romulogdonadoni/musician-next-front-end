import Illustration from "@/../public/illu.svg";
import Image from "next/image";

export default function Auth() {
  return (
    <div className="flex  overflow-clip">
      <div className="flex flex-col bg-black-800 p-10 border border-silver-600 rounded-l-2xl">
        <h1>Welcome To Musician.</h1>
        <h3>Create your account or log in with an existing one.</h3>
        <Image src={Illustration} alt="" />
      </div>
      <div className="flex flex-col w-105 bg-black-700 p-10 gap-4 border border-silver-600 rounded-r-2xl">
        <h1 className="text-xl font-bold">Login</h1>
        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-2xl p-3"
              placeholder="example@email.com"
              type="email"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Nome</label>
            <input className="bg-transparent outline-none border-2 border-orange rounded-2xl p-3" placeholder="username" type="text" name="" id="" />
          </div>
          <div className="flex flex-col gap-1">
            <label>Senha</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-2xl p-3"
              placeholder="********"
              type="password"
              name=""
              id=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Confirme sua senha</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-2xl p-3"
              placeholder="********"
              type="password"
              name=""
              id=""
            />
          </div>
        </form>
      </div>
    </div>
  );
}
