"use client";
import Illustration from "@/../public/illu.svg";
import { RegisterUser } from "@/components/Auth/RegisterUser";
import { RegisterFormData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Auth() {
  const [formData, setFormData] = useState<RegisterFormData>({ email: "", username: "", password: "", role: "ARTIST" });

  return (
    <div className="flex  overflow-clip">
      <div className="flex flex-col bg-black-800 p-10 border border-silver-600 rounded-l-2xl">
        <h1>Welcome To Musician.</h1>
        <h3>Create your account or log in with an existing one.</h3>
        <Image src={Illustration} alt="" />
      </div>
      <div className="flex flex-col w-105 bg-black-700 p-10 gap-4 border border-silver-600 rounded-r-2xl">
        <h1 className="text-xl font-bold">Register</h1>
        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-2xl p-3"
              placeholder="example@email.com"
              type="email"
              name=""
              id=""
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Nome</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-2xl p-3"
              placeholder="username"
              type="text"
              name=""
              id=""
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Senha</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-2xl p-3"
              placeholder="********"
              type="password"
              name=""
              id=""
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
          <RegisterUser formData={formData} />
          <Link href={"/auth/login"}>Login</Link>
        </form>
      </div>
    </div>
  );
}
