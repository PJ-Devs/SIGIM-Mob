import type { Product } from "../../types/products";
import APIInstance from "../axios/axios.config";
import NetInfo from "@react-native-community/netinfo";
import { SQLiteDatabase } from "expo-sqlite";
import { saveProduct, getProducts } from "../sqlite";

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

export const getSingleProduct = async (id: string): Promise<Product> => {
  try {
    const response = await APIInstance.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return {} as Product;   
  }
}