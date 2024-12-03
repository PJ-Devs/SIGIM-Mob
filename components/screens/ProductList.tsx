import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types/products";
import { FlatList, Text, View } from "react-native";
import ProductCard from "../molecules/ProductCard";
import Layout from "../orgnisms/Layout";
import { fetchProducts } from "../../lib/api/api.products";
import Loading from "../molecules/Loading";
import CategoriesCarrousel from "../orgnisms/CategoriesCarrousel";
import { useSQLiteContext } from "expo-sqlite";
import FloatingButton from "../atoms/FloatingButton";
import { router, useFocusEffect } from "expo-router";
import { SIZES, STATES } from "../../utils/consts";
import SearchBar from "../atoms/SearchBar";
import DropDownFilter from "../molecules/DropDownFilter";
import BackButton from "../atoms/BackButton";
import ProfileButton from "../atoms/ProfileButton";

export default function ProductList() {
  const db = useSQLiteContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  const loadProducts = async () => {
    setLoading(true);
    const query = `?search=${filters.search}&status=${filters.status}`;
    await fetchProducts(db, query)
      .then((response) => {
        setProducts(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /**
   * Fetch products and reloads the page when the user navigates back to it
   */
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  return (
    <Layout leftButton={<BackButton />} rightButton={<ProfileButton />}>
      {loading ?? <Loading />}
      <View className="flex-1 bg-white">
        <SearchBar
          onSearch={loadProducts}
          emitSearch={(query) => setFilters({ ...filters, search: query })}
        />
        <View className="pt-3">
          <DropDownFilter
            data={STATES.productsStatus}
            onSearch={(value) => loadProducts()}
            setFilter={(value) => setFilters({ ...filters, status: value })}
            icon="box"
          />
        </View>
        <CategoriesCarrousel />
        {products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <View className="flex-1 items-center my-1.5 w-full">
                <ProductCard
                  product={item}
                  emitLoading={(value) => setLoading(value)}
                />
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
    </Layout>
  );
}
