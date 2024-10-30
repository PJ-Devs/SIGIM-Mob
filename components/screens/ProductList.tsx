import { useEffect, useState } from "react";
import { Product } from "../../types/products";
import { FlatList, ScrollView, View } from "react-native";
import ProductCard from "../molecules/ProductCard";
import Layout from "../orgnisms/Layout";
import { fetchProducts, fetchProductSearch } from "../../lib/api/api.fetch";
import Loading from "../molecules/Loading";
import CategoriesCarrousel from "../orgnisms/CategoriesCarrousel";
import Toast from "react-native-toast-message";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = async (query: string) => {
    setLoading(true);
    const fetchedProducts = await fetchProductSearch(query).finally(() => {
      setLoading(false);
    });
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts().finally(() => {
        setLoading(false);
      });
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <Layout includeSearch={true} onSearch={onSearch} canGoBack={false}>
      {loading ? (
        <Loading />
      ) : (
        <View style = {{flex:1}}>
          <CategoriesCarrousel />
          <FlatList
            data={products}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <View className="flex items-center my-2 w-full px-1.5">
                <ProductCard product={item} />
              </View>
            )}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            windowSize={5}
            ListHeaderComponent={() => <View style={{ height: 10 }} />}
            ListFooterComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      )}
      <Toast />
    </Layout>
  );
}
