import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";

interface IRegister {}

interface ILogin {}

export const registerEnterprise = async (body: IRegister) => {
  APIInstance.post("/auth/signup", body).then((response: AxiosResponse) => {
    return response.data;
  });
};

export const login = async (body: ILogin) => {
  APIInstance.post("/auth/token", body).then((response: AxiosResponse) => {
    return response.data;
  });
};
