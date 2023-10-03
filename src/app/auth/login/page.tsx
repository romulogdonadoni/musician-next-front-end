"use client";

import Illustration from "@/../public/illu.svg";
import { LoginFormData } from "@/types/types";
import axios from "axios";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";


type SignInType = {
  email: string;
  password: string;
};

export default function Auth() {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const router = useRouter();

  async function handleSignIn({ email, password }: SignInType) {
    const { token } = await axios
      .post("https://musician-project-be.onrender.com/auth/login", {
        email,
        password,
      })
      .then((res) => {
        return res.data;
      });
    setCookie("auth-token", token, { maxAge: 60 * 60 * 6 });
    router.replace("/");
  }

  return (
    <div className="flex  overflow-clip">
      <div className="flex flex-col bg-black-800 p-10 border border-silver-600 rounded-l-lg">
        <h1>Welcome To Musician.</h1>
        <h3>Create your account or log in with an existing one.</h3>
        <Image src={Illustration} alt="" />
      </div>
      <div className="flex flex-col w-105 bg-black-700 p-10 gap-4 border border-silver-600 rounded-r-lg">
        <h1 className="text-xl font-bold">Login</h1>
        <form className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              className="bg-transparent outline-none border-2 border-orange rounded-lg p-3"
              placeholder="example@email.com"
              type="text"
              name=""
              id=""
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
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
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </div>
          <div className="flex item-center justify-between">
            <Link href={"/auth/register"} className="flex items-center text-orange">
              Register
            </Link>
            <button
              className="flex items-center justify-center rounded-lg bg-orange py-2 px-4"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSignIn(formData);
              }}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
