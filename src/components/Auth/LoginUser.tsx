import { LoginFormData } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
interface LoginFormDataProps {
  formData: LoginFormData;
}
export function LoginUser({ formData }: LoginFormDataProps) {
  const router = useRouter();
  /*   const handleCreateUser = () => {
    axios.post("https://musician-project-be.onrender.com/auth/login", formData).then(() => router.push("/"));
  }; */
  const handleCreateUser = () => {
    axios.post("https://musician-project-be.onrender.com/auth/login", formData).then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      router.push("/");
    });
  };
  return (
    <button
      className="flex items-center justify-center rounded-2xl bg-orange p-2"
      type="submit"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      Sign In
    </button>
  );
}
