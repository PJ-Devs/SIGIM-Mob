import { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { View } from "react-native";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import { fetchProducts } from "../../../lib/fetch";
import Layout from "../../orgnaisms/Layout/Layout";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <Layout>
      <View
        style={{
          padding: 0,
          gap: 10,
        }}
      >
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </View>
    </Layout>
  );
}
