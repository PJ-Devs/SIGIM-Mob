import { AxiosResponse } from "axios";
import APIInstance from "../axios/axios.config";
import { type Product } from '../../types/products'
import { getSecuredItem } from "../../utils/secureStore";
import { saveProduct, getProducts, saveUserData} from "../sqlite"
import NetInfo from '@react-native-community/netinfo'; 

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      console.warn('No hay conexión a Internet. Recuperando productos de la base de datos local.');
      return new Promise((resolve, reject) => {
        getProducts((products: Product[]) => {
          resolve(products);
        });
      });
    }

    const response: AxiosResponse = await APIInstance.get("/products");
    const data = response.data;
    const products: Product[] = data.data;
    for (const product of products) {
      await saveProduct(product);
    }
    
    return products; 
  } catch (error) {
    console.error('Error sincronizando la base de datos local:', error);
  }
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
    await saveUserData(response.data.data);

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