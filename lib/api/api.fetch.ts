import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";
import { type Product } from "../../types/products";
import { getSecuredItem } from "../../utils/secureStore";
import { saveProduct, getProducts, saveUserData } from "../sqlite";
import NetInfo from "@react-native-community/netinfo";
import { SQLiteDatabase } from "expo-sqlite";

export const fetchProducts = async (db:SQLiteDatabase): Promise<Product[]> => {
  try {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      console.warn('No hay conexión a Internet. Recuperando productos de la base de datos local.');
      return new Promise((resolve, reject) => {
        getProducts(db)
      });
    }
    const response = await APIInstance.get("/products");
    const products: Product[] = response.data.data;
    for (const product of products) {
      await saveProduct(db, product);
    }
    
    return products; 
  } catch (error) {
    console.error('Error sincronizando la base de datos local:', error);
  }
};

export const fetchProductSearch = async (query: string): Promise<Product[]> => {
  try {
    const response = await APIInstance.get(`/products?search=${query}`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export const getProfile = async () => {
  try {
    const response = await APIInstance.get("/profile");
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

export const getEnterprise = async () => {
  try {
    const response = await APIInstance.get("/enterprise", {
      headers: {
        "Authorization": `Bearer ${await getSecuredItem("ACCESS_TOKEN")}`, 
      },
    });
    const enterprise = response.data.data;
    return enterprise;
  } catch(error){
    console.error("Failed to fetch enterprise id:", error); 
    return null;
  }
}

export const deleteEnterprise = async () =>{
  try{
    const enterprise = await getEnterprise()
    const id = enterprise.id
    const response = await APIInstance.delete(`/enterprises/${id}`);
    return response.data.data;
  } catch(error){
    console.error("Failed to delete enterprise:", error);
    return null;
  }
}
