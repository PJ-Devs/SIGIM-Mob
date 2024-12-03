import { useCallback, useEffect, useState } from "react";
import { Product } from "../../types/products";
import { FlatList, LayoutAnimation, Text, View } from "react-native";
import ProductCard from "../molecules/ProductCard";
import Layout from "../orgnisms/Layout";
import { fetchProducts } from "../../lib/api/api.products";
import Loading from "../molecules/Loading";
import CategoriesCarrousel from "../orgnisms/CategoriesCarrousel";
import { useSQLiteContext } from "expo-sqlite";
import FloatingButton from "../atoms/FloatingButton";
import { router } from "expo-router";
import { SIZES, STATES } from "../../utils/consts";
import SearchBar from "../atoms/SearchBar";
import DropDownFilter from "../molecules/DropDownFilter";
import BackButton from "../atoms/BackButton";
import ProfileButton from "../atoms/ProfileButton";
import { showNotification } from "../../lib/toast/toastify";

export default function ProductList() {
  const db = useSQLiteContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
  });

  const loadProducts = async (queries?: {
    status?: string;
    category?: string;
  }) => {
    try {
      const query = `?search=${filters.search}&${
        queries?.status ? `status=${queries.status}` : ""
      }&${queries?.category ? `category=${queries.category}` : ""}`;
      await fetchProducts(db, query)
        .then((response) => {
          setProducts(response);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      showNotification("error", "No se pudieron cargar los productos");
    }
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [products]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout leftButton={<BackButton />} rightButton={<ProfileButton />}>
      {loading && !products ? (
        <Loading />
      ) : (
        <View className="flex-1 bg-white">
          <SearchBar
            onSearch={loadProducts}
            emitSearch={(query) => setFilters({ ...filters, search: query })}
          />
          <View className="pt-3">
            <DropDownFilter
              data={STATES.productsStatus}
              onSearch={(value) => loadProducts({ status: value })}
              setFilter={(value) => setFilters({ ...filters, status: value })}
              icon="box"
            />
          </View>
          <CategoriesCarrousel />
          <FlatList
            data={products}
            ListEmptyComponent={() => (
              <View
                className="flex justify-center items-center p-2 relative"
                style={{
                  top: SIZES.height / 4,
                }}
              >
                {loading ? (
                  <Loading />
                ) : (
                  <View>
                    <Text className="font-semibold text-lg text-gray-600 text-center">
                      ¿Nada por aquí 🤔?
                    </Text>
                    <Text className="font-semibold text-lg text-gray-600 text-center">
                      ¡Agrega un nuevo producto! 🚀
                    </Text>
                  </View>
                )}
              </View>
            )}
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
          <FloatingButton
            loading={loading}
            onPress={() => router.push("/createProductForm")}
          />
        </View>
      )}
    </Layout>
  );
}
