import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";

interface Register {
}

interface Login {
  email: string;
  password: string;
}

export const apiRegisterEnterprise = async (body: Register) => {
  return APIInstance.post("/auth/signup", body).then((response: AxiosResponse) => {
    return response.data;
  });
};

export const apiLogin = async (body: Login) => {
   return APIInstance.post("/auth/token", body).then((response: AxiosResponse) => {
    return response.data;
  });
};

export const apiLogOut = async (body: { device_name: string }) => {
  return APIInstance.post("/auth/logout", body).then((response: AxiosResponse) => {
    return response.data;
  });
}
