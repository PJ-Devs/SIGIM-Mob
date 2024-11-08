import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Layout from "../orgnisms/Layout";
import { View } from "react-native";
import { Product } from "../../types/products";
import { getSingleProduct } from "../../lib/api/api.products";
import Loading from "../molecules/Loading";
import ProductInformation from "../molecules/ProductInformation";
import CustomInput from "../atoms/CustomInput";
import { useForm } from "react-hook-form";

export default function SingleProduct(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useLocalSearchParams();
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
        <View className="w-full flex-1 items-center" style={{ gap: 20 }}>
          <ProductInformation product={product!} />
          <View className="w-full" style={{ gap: 15 }}>
            <CustomInput
              label="Descuento (%)"
              initialValue={product?.discount.toString()}
              type="numeric"
              propertyName="discount"
              control={control}
            />
            <CustomInput
              label="Stock disponible (U)"
              initialValue={product?.stock.toString()}
              type="numeric"
              propertyName="stock"
              control={control}
            />
          </View>
        </View>
      )}
    </Layout>
  );
}
