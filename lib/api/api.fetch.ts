import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";
import { type Product } from '../../types/products'
import { getSecuredItem } from "../../utils/secureStore";

export const fetchProducts = async (): Promise<Product[]> => {
  return APIInstance.get("/products").then((response: AxiosResponse) => {
    const data = response.data;
    return data.data;
  });
};

export const fetchProductSearch = async (query: string): Promise<Product[]> => {
  return APIInstance.get(`/products/${query}`).then((response: AxiosResponse) => {
    const data = response.data;
    return data.data;
  });
}

export const getProfile = async () => {
  try {
    const response = await APIInstance.get("/profile", {
      headers: {
        "Authorization": `Bearer ${await getSecuredItem("ACCESS_TOKEN")}`, 
      },
    });
    console.log("user:", response.data.data); 
    return response.data.data; 
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null; 
  }
};

export const updateProfile = async (body: any) => {
  try {
    const response = await APIInstance.put("/profile", body, {
      headers: {
        "Authorization": `Bearer ${await getSecuredItem("ACCESS_TOKEN")}`, 
      },
    });
    return response.data.data; 
  } catch (error) {
    console.error("Failed updating user:", error);
    return null; 
  }
};