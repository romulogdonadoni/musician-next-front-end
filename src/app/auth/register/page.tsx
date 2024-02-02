"use client";
import Illustration from "@/../public/illu.svg";
import { RegisterFormData } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

type SignUpType = {
  email: string;
  username: string;
  password: string;
  role: string;
};

export default function Auth() {
  const [formData, setFormData] = useState<RegisterFormData>({ email: "", username: "", password: "", role: "ARTIST" });
  const router = useRouter()

  async function handleSignUp({ email, username, password, role }: SignUpType) {
    await axios
      .post("https://musician-project-be.onrender.com/auth/register", {
        email,
        username,
        password,
        role
      })
    router.replace("/auth/login");
  }

  return (
    <div className="flex  overflow-clip">
      <div className="flex flex-col bg-black-800 p-10 border border-silver-600 rounded-l-lg">
        <h1>Welcome To Musician.</h1>
        <h3>Create your account or log in with an existing one.</h3>
        <Image src={Illustration} alt="" />
      </div>
      <div className="flex flex-col w-105 bg-black-700 p-10 gap-4 border border-silver-600 rounded-r-lg">
        <h1 className="text-xl font-bold">Register</h1>
        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-lg p-3"
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
              className="bg-transparent outline-none border-2 border-orange rounded-lg p-3"
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
              className="bg-transparent outline-none border-2 border-orange rounded-lg p-3"
              placeholder="********"
              type="password"
              name=""
              id=""
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="flex item-center justify-between">
            <Link href={"/auth/login"} className="flex items-center text-orange">
              Login
            </Link>
            <button
              className="flex items-center justify-center rounded-lg bg-orange py-2 px-4"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignUp(formData);
              }}
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
