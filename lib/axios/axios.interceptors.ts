import { InternalAxiosRequestConfig } from "axios";
import APIInstance from "./axios.config";

export const authInterceptor = () => {
  const updateAuthorizationHeader = (request: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  }

  APIInstance.interceptors.request.use((request) => {
    const unAuthenticatedRoutes = ["/auth/signup", "/auth/token"];
    unAuthenticatedRoutes.forEach((route) => {
      if (request.url?.includes(route)) {
        return request;
      }
    });
    return updateAuthorizationHeader(request);
  });
}

export const errorInterceptor = () => {
  APIInstance.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
}