import type { Product } from "../../types/products";
import APIInstance from "../axios/axios.config";
import NetInfo from "@react-native-community/netinfo";
import { SQLiteDatabase } from "expo-sqlite";
import { saveProduct, getProducts } from "../sqlite";

export const fetchProducts = async (
  db: SQLiteDatabase,
  query: string
): Promise<Product[]> => {
  try {
    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      console.warn(
        "No hay conexión a Internet. Recuperando productos de la base de datos local."
      );
      return new Promise((resolve, reject) => {
        getProducts(db);
      });
    }
    const response = await APIInstance.get(`/products${query ?? ""}`);
    const products: Product[] = response.data.data;
    for (const product of products) {
      await saveProduct(db, product);
    }

    return products;
  } catch (error) {
    console.error("Error sincronizando la base de datos local:", error);
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
};

export const createProduct = async (product: {
  name: string;
  description: string;
  supplier_price: number;
  sale_price: number;
  stock: number;
  minimal_safe_stock: number;
  thumbnail: any;
  discount: number;
  category_id: string;
  supplier_id: number;
  is_favorite: boolean;
}) => {
  try {
    const response = await APIInstance.post("/products", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: [
        (data, headers) => {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (key === "thumbnails") {
              formData.append("thumbnail", {
                name: (value as any).fileName,
                type: (value as any).type,
                uri: (value as any).uri,
              } as any);
            } else {
              formData.append(key, value as any);
            }
          });
          return formData;
        },
      ],
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    return null;
  }
};

export const updateProduct = async (
  id: string,
  product: {
    name?: string;
    description?: string;
    supplier_price?: number;
    sale_price?: number;
    added_stock?: boolean;
    stock_change?: number;
    stock?: number;
    status?: string;
    minimal_safe_stock?: number;
    discount?: number;
    thumbnail?: any;
    is_favorite?: boolean;
    category_id?: string;
    supplier_id?: number;
  }
) => {
  try {
    const response = await APIInstance.put(`/products/${id}`, product);
    return response.data.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    return null;
  }
};
