import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Layout from "../orgnisms/Layout";
import { ScrollView, Text, View } from "react-native";
import { Product } from "../../types/products";
import { getSingleProduct } from "../../lib/api/api.products";
import Loading from "../molecules/Loading";
import ProductInformation from "../molecules/ProductInformation";
import CustomInput from "../atoms/CustomInput";
import { useForm } from "react-hook-form";
import FixedMessage from "../atoms/FixedMessage";

export default function SingleProduct(): JSX.Element {
  const { id } = useLocalSearchParams();
  
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const { control } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        await getSingleProduct(id as string)
          .then((response) => setProduct(response))
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Layout canGoBack={false}>
      {loading ? (
        <Loading />
      ) : (
        <View className="w-full flex-1 items-center">
          <ScrollView contentContainerStyle={{
            flexGrow: 1,
            gap: 20
          }}>
            <ProductInformation product={product!} />
            <View className="w-full" style={{ gap: 15 }}>
              <CustomInput
                label="Descuento (%)"
                initialValue={product?.discount.toString()}
                type="numeric"
                propertyName="discount"
                control={control}
              />
              <View style={{ gap: 5 }}>
                <CustomInput
                  label="Stock disponible (U)"
                  initialValue={product?.stock.toString()}
                  type="numeric"
                  propertyName="stock"
                  control={control}
                />
                <Text>
                  El stock mínimo seguro es de {product?.minimal_safe_stock}{" "}
                  unidades.
                </Text>
              </View>
            </View>
            {product!.stock < product!.minimal_safe_stock && (
              <FixedMessage
                title="Stock bajo"
                message={`${product?.name} tiene pocas existencias.`}
                type="warning"
                position="bottom"
              />
            )}
          </ScrollView>
        </View>
      )}
    </Layout>
  );
}
