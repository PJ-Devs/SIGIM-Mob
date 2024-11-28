import { Image, Text, View } from "react-native";
import { Product } from "../../types/products";
import LottieView from "lottie-react-native";
import { SIZES } from "../../utils/consts";
import { useState } from "react";
import { showCurrency } from "../../utils/helpser";
import Icon from "react-native-vector-icons/FontAwesome5";

interface ProductInformationProps {
  product: Product;
}

export default function ProductInformation({
  product,
}: ProductInformationProps): JSX.Element {
  const [imageLoading, setImageLoading] = useState(false);

  return (
    <View>
      <View className="items-center mt-10">
        {imageLoading && (
          <LottieView
            source={require("../../assets/animations/image-loader.json")}
            autoPlay
            loop
            speed={1.5}
            resizeMode="cover"
            style={{ width: "33%", zIndex: 1 }}
          />
        )}
        <Image
          alt="Product Image"
          resizeMode="contain"
          style={{
            width: SIZES.width * 0.55,
            height: SIZES.width * 0.55,
            zIndex: 1,
          }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_SERVER_URL}/${product?.thumbnail}`,
          }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        <Text className="text-lg font-semibold text-center mb-1.5 mt-2">
          {product?.name}
        </Text>
        <Text className="text-sm text-center text-gray-800">
          {product?.description}
        </Text>
        <View className="mt-2">
          {[
            {
              label: "Categoría",
              value: product?.category.name,
              icon_name: "box",
            },
            {
              label: "Proveedor",
              value: product?.supplier_id,
              icon_name: "truck",
            },
            {
              label: "Stock disponible",
              value: `${product?.stock} unidades`,
              icon_name: "layer-group",
            },
            {
              label: "Stock mínimo",
              value: `${product?.minimal_safe_stock} unidades`,
              icon_name: "box-open",
            },
          ].map((item) => (
            <View className="w-full flex-row justify-between px-[2%]">
              <View className="flex-row items-center" style={{ gap: 5 }}>
                <Icon name={item.icon_name} size={18} />
                <Text className="text-base">{item.label}:</Text>
              </View>
              <Text className="text-base font-semibold">{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-3">
        <View className="h-[1px] bg-gray-600 w-full" />
        <Text className="text-base font-semibold text-center mb-2">
          Margen de ganancia por unidad
        </Text>
        <View className="w-[95%] mx-auto">
          {[
            {
              label: "Precio de venta",
              value: `${showCurrency(product?.sale_price)}`,
            },
            {
              label: "Precio del proveedor",
              value: `${showCurrency(product?.supplier_price)}`,
            },
            {
              label: "Descuento",
              value: `${showCurrency(product.sale_price * product.discount)} (${
                product?.discount * 100
              }%)`,
              textColor: "text-red-600",
              borderBottom: true,
            },
            {
              label: "Ganancia",
              value: `${showCurrency(
                product.sale_price -
                  product.supplier_price -
                  product.sale_price * product.discount
              )}`,
              textColor: "text-green-700",
            },
          ].map(
            (
              { label, value, textColor = "text-gray-800", borderBottom },
              index
            ) => (
              <View
                key={index}
                className={`flex-row justify-between ${
                  borderBottom ? "border-b-[1px] border-gray-600" : ""
                }`}
              >
                <Text className="text-sm font-semibold">{label}</Text>
                <Text className={`text-sm text-center ${textColor}`}>
                  {value}
                </Text>
              </View>
            )
          )}
        </View>
        <View className="h-[1px] bg-gray-600 my-1 w-full" />
      </View>
    </View>
  );
}
