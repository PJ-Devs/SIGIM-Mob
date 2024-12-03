import { Supplier } from "../../types/products";
import APIInstance from "../axios/axios.config";

export const getSuppliers = async () => {
  try {
    const response = await APIInstance.get('/suppliers');
    return response.data.data as Supplier[];
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    return [];
  }
};

export const getSupplier = async (id: string) => {
  try {
    const response = await APIInstance.get(`/suppliers/${id}`);
    return response.data.data as Supplier;
  } catch (error) {
    console.error("Failed to fetch supplier:", error);
    return null;
  }
};

export const createSupplier = async (category: {
  name: string;
  description: string;
}) => {
  try {
    const response = await APIInstance.post("/suppliers", category);
    return response.data.data as Supplier;
  } catch (error) {
    console.error("Failed to create supplier:", error);
    return null;
  }
};

export const updateSupplier = async (id: string, supplier: {
  name: string;
  email: string;
  phone_number: string;
  NIT: string;
}) => {
  try {
    const response = await APIInstance.put(`/suppliers/${id}`, supplier);
    return response.data.data as Supplier;
  } catch (error) {
    console.error("Failed to update supplier:", error);
    return null;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    await APIInstance.delete(`/suppliers/${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete supplier:", error);
    return false;
  }
};
