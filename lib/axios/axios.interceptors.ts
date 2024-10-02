import { AxiosError, InternalAxiosRequestConfig } from "axios";
import APIInstance from "./axios.config";
import { getSecuredItem } from "../../utils/secureStore";

export const authInterceptor = () => {
  const updateAuthorizationHeader = async (request: InternalAxiosRequestConfig) => {
    return await getSecuredItem("ACCESS_TOKEN").then((token) => {
      console.log("Token", token);
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    });
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
      // console.log(response);
      return response;
    },
    // Handles any statys code that is not in the range of 2XX
    (error) => {
      console.log("Error", error)
      return Promise.reject(error);
    }
  );
}