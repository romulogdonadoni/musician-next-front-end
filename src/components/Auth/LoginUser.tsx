import { LoginFormData } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, destroyCookie } from "nookies";

interface LoginFormDataProps {
  formData: LoginFormData;
}
export function LoginUser({ formData }: LoginFormDataProps) {
  const router = useRouter();
  const handleCreateUser = () => {
    axios.post("https://musician-project-be.onrender.com/auth/login", formData).then((res) => {
      destroyCookie(undefined, "token")
      setCookie(undefined, "token", `Bearer ${res.data.token}`, { path: "/", maxAge: 60 * 60 * 1 });
      router.replace("/");
    });
  };
  return (
    <button
      className="flex items-center justify-center rounded-2xl bg-orange py-2 px-4"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        handleCreateUser();
      }}
    >
      Sign In
    </button>
  );
}
