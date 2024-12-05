import { useEffect, useState } from "react";
import { Product } from "../../types/products";
import { FlatList, View, Text } from "react-native";
import Layout from "../orgnisms/Layout";
import { fetchProducts } from "../../lib/api/api.products";
import Loading from "../molecules/Loading";
import Toast from 'react-native-toast-message';
import { useSQLiteContext } from "expo-sqlite";
import ProductSellCard from "../molecules/ProductSellCard";
import { set } from "react-hook-form";
import { showNotification } from "../../lib/toast/toastify";

export default function Sell(): JSX.Element {
  const db = useSQLiteContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [queryProducts, setQueryProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSearch = async (query: string) => {
    setLoading(true);
    // const fetchedProducts = await fetchProductSearch(query).finally(() => {
    //   setLoading(false);
    // });

    const qProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(query.toLowerCase())
    })

    setQueryProducts(qProducts);
    setQuery(query);
    setLoading(false);

    // setProducts(fetchedProducts);
  };

  const handleProductAdded = async () => {
    setLoading(true);
    const fetchedProducts = await fetchProducts(db, "")
      .finally(() => {
        setLoading(false);
      });
    setProducts(fetchedProducts);
  }

  const loadProducts = async () => {
    try {
      await fetchProducts(db)
        .then((response: any) => {
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
    loadProducts();
  }, []);

  return (
    <Layout>
      <Text className="uppercase text-[#39cdcd] text-lg font-bold text-center mb-4">Crear una venta</Text>
      {loading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={query ? queryProducts : products}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <View className="flex items-center my-2 w-full px-1.5">
                <ProductSellCard product={item} onAddedProduct={handleProductAdded} />
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
    </Layout>
  );
}
