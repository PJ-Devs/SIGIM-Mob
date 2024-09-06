import { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { FlatList, View } from "react-native";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import { fetchProducts, fetchProductSearch } from "../../../lib/fetch";
import Layout from "../../orgnisms/Layout/Layout";
import SearchBar from "../../atoms/SearchBar/SearchBar";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const onSearch = async (query: string) => {
    const fetchedProducts = await fetchProductSearch(query);
    setProducts(fetchedProducts);
  }

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <Layout>
      <View style={{
        marginBottom: 10,
      }}>
        <SearchBar onSearch={onSearch} />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginVertical: 7,
              width: "100%",
              paddingHorizontal: 5,
            }}
          >
            <ProductCard product={item} />
          </View>
        )}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
      />
    </Layout>
  );
}
