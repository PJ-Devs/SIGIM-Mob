import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";

interface Register {}

interface Login {
  email: string;
  password: string;
}

export const apiRegisterEnterprise = async (body: Register) => {
  return APIInstance.post("/auth/signup", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};

export const apiLogin = async (body: Login) => {
  return APIInstance.post("/auth/token", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};

export const apiLogOut = async (body: { device_name: string }) => {
  return APIInstance.post("/auth/logout", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};

export const restorePassword = async (body: {
  email: string;
  password: string;
}) => {
  return APIInstance.post("/auth/password-reset", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};

export const requestPasswordResetOTP = async (body: { email: string }) => {
  return APIInstance.post("/otp/password-reset", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};

export const verifyPasswordResetOTP = async (body: {
  email: string;
  token: string;
}) => {
  return APIInstance.post("/otp/password-reset/verify", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};
