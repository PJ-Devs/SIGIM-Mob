import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";
import { type Product } from '../../types/products'

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
