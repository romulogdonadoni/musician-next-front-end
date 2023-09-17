"use client";

import React, { createContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {setCookie} from "cookies-next"


interface AuthContextProviderProps {
  children: React.ReactNode;
}
type SignType = {
  email: string;
  password: string;
};
type AuthContextType = {
  handleSignIn: (data: SignType) => Promise<void>;
};
export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();

  async function handleSignIn({ email, password }: SignType) {
    const { token } = await axios.post("https://musician-project-be.onrender.com/auth/login", { email, password }).then((res) => {
      return res.data;
    });
    setCookie("auth-token", token, {maxAge: 60 * 60 * 1 });
    router.replace("/");
  }
  return <AuthContext.Provider value={{ handleSignIn }}>{children}</AuthContext.Provider>;
}
