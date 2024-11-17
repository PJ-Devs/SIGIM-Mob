import { Image, Text, View } from "react-native";
import { Product } from "../../types/products";
import LottieView from "lottie-react-native";
import { SIZES } from "../../utils/consts";
import { useState } from "react";

interface ProductInformationProps {
  product: Product;
}

export default function ProductInformation({
  product,
}: ProductInformationProps): JSX.Element {
  const [imageLoading, setImageLoading] = useState(false);

  const discount = (product.sale_price * (product.discount / 100)).toFixed(2);
  const gainMargin = (product.sale_price - product.supplier_price - parseFloat(discount)).toFixed(2);

  return (
    <View>
      <View className="items-center">
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
        <Text className="text-lg font-semibold text-center mb-1.5">
          {product?.name}
        </Text>
        <Text className="text-sm text-center text-gray-800">
          {product?.description}
        </Text>
      </View>

      <View className="mt-5">
        <View className="h-[1px] bg-gray-600 my-1 w-full" />
        <Text className="text-base font-semibold text-center mb-2">
          Margen de ganancia por unidad
        </Text>
        <View className="w-[90%] mx-auto">
          {[
            { label: "Precio del proveedor", value: `$${product?.supplier_price}` },
            { label: "Precio de venta", value: `$${product?.sale_price}` },
            {
              label: "Descuento",
              value: `(${product?.discount}%) $${discount}`,
              textColor: "text-red-600",
              borderBottom: true,
            },
            { label: "Ganancia", value: `$${gainMargin}`, textColor: "text-green-700" },
          ].map(({ label, value, textColor = "text-gray-800", borderBottom }, index) => (
            <View
              key={index}
              className={`flex-row justify-between ${borderBottom ? "border-b-[1px] border-gray-600" : ""
                }`}
            >
              <Text className="text-sm font-semibold">{label}</Text>
              <Text className={`text-sm text-center ${textColor}`}>{value}</Text>
            </View>
          ))}
        </View>
        <View className="h-[1px] bg-gray-600 my-1 w-full" />
      </View>
    </View>
  );
}
