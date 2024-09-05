export const  fetchProducts = async (): Promise<any[]> =>{
    
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  
}