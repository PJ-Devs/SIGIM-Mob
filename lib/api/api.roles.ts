import { Role } from "../../types/products";
import APIInstance from "../axios/axios.config";

export const getRoles = async () => {
  try {
    const response = await APIInstance.get("/roles");
    return response.data.data as Role[];
  } catch (error) {
    console.error("Failed to fetch roles:", error);
    return [];
  }
};

export const getRole = async (id: string) => {
  try {
    const response = await APIInstance.get(`/roles/${id}`);
    return response.data.data as Role;
  } catch (error) {
    console.error("Failed to fetch role:", error);
    return null;
  }
};

export const createRole = async (role: {
  name: string;
  description: string;
}) => {
  try {
    const response = await APIInstance.post("/roles", role);
    return response.data.data as Role;
  } catch (error) {
    console.error("Failed to create role:", error);
    return null;
  }
};
