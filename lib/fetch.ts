import { type Product } from '../types/products'

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("http://192.168.1.7:8000/api/products");
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export const fetchProductSearch = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch("http://192.168.1.7:8000/api/products");
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
