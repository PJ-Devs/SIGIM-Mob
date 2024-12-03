import { Category } from "../../types/products";
import APIInstance from "../axios/axios.config";

/**
 * Used to get categories from the API with optional query
 * @param query - The 'search' query to filter categories
 * @returns An array of categories if successful, an empty array otherwise
 */
export const getCategories = async (query?: string) => {
  try {
    const response = await APIInstance.get(
      `${query ? `/categories${query}` : "/categories"}`
    );
    return response.data.data as Category[];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

/**
 * Used to get a specific category by its ID
 * @param id - The ID of the category to fetch
 * @returns The category object if successful, null otherwise
 */
export const getCategory = async (id: string) => {
  try {
    const response = await APIInstance.get(`/categories/${id}`);
    return response.data.data as Category;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
};

/**
 * Used to create a new category
 * @param category - An object containing the name and description of the category
 * @returns The created category object if successful, null otherwise
 */
export const createCategory = async (category: {
  name: string;
  description: string;
}) => {
  try {
    const response = await APIInstance.post("/categories", category);
    return response.data.data as Category;
  } catch (error) {
    console.error("Failed to create category:", error);
    return null;
  }
};

/**
 * Used to update an existing category by its ID
 * @param id - The ID of the category to update
 * @param category - An object containing the updated name and description of the category
 * @returns The updated category object if successful, null otherwise
 */
export const updateCategory = async (id: string, category: {
  name: string;
  description: string;
}) => {
  try {
    const response = await APIInstance.put(`/categories/${id}`, category);
    return response.data.data as Category;
  } catch (error) {
    console.error("Failed to update category:", error);
    return null;
  }
};

/**
 * Used to delete a category by its ID
 * @param id - The ID of the category to delete
 * @returns True if the category was successfully deleted, false otherwise
 */
export const deleteCategory = async (id: string) => {
  try {
    await APIInstance.delete(`/categories/${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete category:", error);
    return false;
  }
};
