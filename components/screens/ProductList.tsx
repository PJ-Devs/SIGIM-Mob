import { useEffect, useState } from "react";
import { Product } from "../../types/products";
import { FlatList, View, StyleSheet } from "react-native";
import ProductCard from "../molecules/ProductCard";
import Layout from "../orgnisms/Layout";
import { fetchProducts, fetchProductSearch } from "../../lib/api/api.fetch";
import Loading from "../molecules/Loading";
import CategoriesCarrousel from "../orgnisms/CategoriesCarrousel";
import Toast from 'react-native-toast-message';
import { useSQLiteContext } from "expo-sqlite";
import FloatingButton from "../atoms/FloatingButton";

export default function ProductList() {
  const db = useSQLiteContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetchProductSearch(query);
      setProducts(response);
    } catch (error) {
      console.error("Failed to fetch products:", error); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts(db)
      .then((response) => {
        setProducts(response);
      })
      .finally(() => {
        setLoading(false);
      });
    };

    loadProducts();
  }, []);

  return (
    <Layout includeSearch={true} onSearch={onSearch} canGoBack={false}>
      {loading ? (
        <Loading />
      ) : (
        <View className="flex-1 bg-white">
          <CategoriesCarrousel />
          <FlatList
            data={products}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <View className="flex-1 items-center my-1.5 w-full">
                <ProductCard product={item} />
              </View>
            )}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            windowSize={5}
            ListHeaderComponent={() => <View className="h-3" />}
            ListFooterComponent={() => <View className="h-20" />}
          />
            <FloatingButton loading={loading} onPress={() => {}} />
        </View>
      )}
    </Layout>
  );
}