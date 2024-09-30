import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";

interface Register {
}

interface Login {
  email: string;
  password: string;
}

export const registerEnterprise = async (body: Register) => {
  return APIInstance.post("/auth/signup", body).then((response: AxiosResponse) => {
    return response.data;
  });
};

export const login = async (body: Login) => {
   return APIInstance.post("/auth/token", body).then((response: AxiosResponse) => {
    return response.data;
  });
};
