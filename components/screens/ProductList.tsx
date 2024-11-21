import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types/products";
import { FlatList, Text, View } from "react-native";
import ProductCard from "../molecules/ProductCard";
import Layout from "../orgnisms/Layout";
import { fetchProducts, fetchProductSearch } from "../../lib/api/api.products";
import Loading from "../molecules/Loading";
import CategoriesCarrousel from "../orgnisms/CategoriesCarrousel";
import { useSQLiteContext } from "expo-sqlite";
import FloatingButton from "../atoms/FloatingButton";
import { router, useFocusEffect } from "expo-router";
import { SIZES } from "../../utils/consts";

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

  /**
   * Fetch products and reloads the page when the user navigates back to it
   */
  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  return (
    <Layout includeSearch={true} onSearch={onSearch} canGoBack={false}>
      {loading ? (
        <Loading />
      ) : (
        <View className="flex-1 bg-white">
          <CategoriesCarrousel />
          {products.length > 0 ? (
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
          ) : (
            <View
              className="flex justify-center items-center p-2 relative"
              style={{
                top: SIZES.height / 4,
              }}
            >
              <Text className="font-semibold text-lg text-gray-600 text-center">
                ¿Eres nuevo por aquí 🤔?
              </Text>
              <Text className="font-semibold text-lg text-gray-600 text-center">
                ¡Agrega tu primer producto!
              </Text>
            </View>
          )}
          <FloatingButton
            loading={loading}
            onPress={() => router.push("/createProductForm")}
          />
        </View>
      )}
    </Layout>
  );
}
