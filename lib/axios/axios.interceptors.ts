import { AxiosError, InternalAxiosRequestConfig } from "axios";
import APIInstance from "./axios.config";
import { getSecuredItem } from "../../utils/secureStore";
import Toast from "react-native-toast-message";

export const authInterceptor = () => {
  const updateAuthorizationHeader = async (request: InternalAxiosRequestConfig) => {
    return await getSecuredItem("ACCESS_TOKEN").then((token) => {
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
      return response;
    },
    // Handles any statys code that is not in the range of 2XX
    (error) => {
      Toast.show({
        type: "error",
        text1: "Ha ocurrido un error",
        text2: error.response?.data?.message ?? "Error desconocido",
        visibilityTime: 3000,
        swipeable: true,
        text1Style: { fontSize: 16 },
        text2Style: { fontSize: 14 },
        topOffset: 60,
      });
      return Promise.reject(error);
    }
  );
}