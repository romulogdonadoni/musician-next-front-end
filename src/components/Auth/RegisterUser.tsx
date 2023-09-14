import { RegisterFormData } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RegisterFormDataProps {
  formData: RegisterFormData;
}

export function RegisterUser({ formData }: RegisterFormDataProps) {
  const router = useRouter();
  const handleCreateUser = () => {
    axios.post("https://musician-project-be.onrender.com/auth/register", formData).then(() => router.push("/auth/login"));
  };
  return (
    <button
      className="flex items-center justify-center rounded-2xl bg-orange p-2"
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
