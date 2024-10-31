import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";
import { type Product } from "../../types/products";
import { getSecuredItem } from "../../utils/secureStore";
import { saveProduct, getProducts, saveUserData } from "../sqlite";
import NetInfo from "@react-native-community/netinfo";
import { SQLiteDatabase } from "expo-sqlite";

export const fetchProducts = async (db: SQLiteDatabase): Promise<Product[]> => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    console.warn(
      "No hay conexión a Internet. Recuperando productos de la base de datos local."
    );
    const products = await getProducts(db);
    return products;
  }

  const response = await APIInstance.get("/products");
  const products = response.data.data as Product[];

  for (const product of products) {
    await saveProduct(db, product);
  }

  return products;
};

export const fetchProductSearch = async (query: string): Promise<Product[]> => {
  return APIInstance.get(`/products/${query}`).then(
    (response: AxiosResponse) => {
      const data = response.data;
      return data.data;
    }
  );
};

export const getProfile = async () => {
  try {
    const response = await APIInstance.get("/profile");
    console.log("user:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};

export const updateProfile = async (body: any) => {
  return APIInstance.put("/profile", body).then(
    (response: AxiosResponse) => {
      return response.data;
    }
  );
};
