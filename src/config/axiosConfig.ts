import axios from "axios";

export const instance = axios.create({
  baseURL: "https://musician-project-be.onrender.com",
  //baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

/*async function getToken(){
  const cookiesStorage = cookies()
  const token = cookiesStorage.get("auth-token")?.value
  return token
}

const token = getToken()



instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => {
    throw new Error(err);
   // some action 
  }
); */
