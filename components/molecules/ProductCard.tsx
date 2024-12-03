import { Text, View, Image, Pressable } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { Product } from "../../types/products";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { SIZES } from "../../utils/consts";
import { showCurrency } from "../../utils/helpser";
import { updateProduct } from "../../lib/api/api.products";
import { showNotification } from "../../lib/toast/toastify";

interface ProductCardProps {
  product: Product;
  emitLoading: (loading: boolean) => void;
}

export default function ProductCard({
  product,
  emitLoading,
}: ProductCardProps): JSX.Element {
  const [isFav, setIsFav] = useState<boolean>(product.is_favorite);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFavorite = async () => {
    try {
      emitLoading(true);
      await updateProduct(product.id!.toString(), { is_favorite: !isFav }).then(
        (response) => {
          if (response) {
            setIsFav(!isFav);
            showNotification(
              "success",
              `Producto ${isFav ? "eliminado de" : "agregado a"} favoritos`
            );
            emitLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      showNotification("error", "No se pudo actualizar el estado del producto");
      emitLoading(false);
    }
  };

  console.log(`${process.env.EXPO_PUBLIC_SERVER_URL}/${product.thumbnail}`);

  return (
    <Pressable
      onPress={() => {
        router.push(`/products/${product.id}`);
      }}
      className="flex-row bg-white w-full gap-x-2 py-2 px-3 rounded-lg shadow-sm"
    >
      {loading && (
        <LottieView
          source={require("../../assets/animations/image-loader.json")}
          autoPlay
          loop
          speed={1.5}
          resizeMode="cover"
          style={{ width: SIZES.width * 0.28, height: SIZES.width * 0.28 }}
        />
      )}
      <Image
        alt="Product Image"
        resizeMode="contain"
        style={{
          width: loading ? 0 : SIZES.width * 0.28,
          height: loading ? 0 : SIZES.width * 0.28,
        }}
        source={
          product.thumbnail
            ? {
                uri: `${process.env.EXPO_PUBLIC_SERVER_URL}/${product.thumbnail}`,
              }
            : require("../../assets/images/img_placeholder.png")
        }
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      />

      <View
        style={{
          flex: 1,
          height: SIZES.width * 0.28,
          justifyContent: "space-between",
        }}
      >
        <View className="flex-row justify-between items-center gap-x-2 mb-1">
          <View>
            <Text className="font-semibold text-sm shrink grow">
              {product.name}
            </Text>
            <View className="inline w-fit shrink grow">
              {product.stock > 0 &&
                product.stock < product.minimal_safe_stock && (
                  <Text className=" text-xs font-semibold text-gray-800 bg-orange-300 px-1 rounded-sm inline">
                    Disponibilidad baja
                  </Text>
                )}
              {product.stock === 0 && (
                <Text className="text-xs font-semibold text-white bg-red-600 px-1 rounded-sm">
                  Producto agotado
                </Text>
              )}
            </View>
          </View>
          <Pressable onPress={handleFavorite}>
            {isFav ? (
              <Icon name="heart" size={22} color="red" />
            ) : (
              <Icon name="hearto" size={22} color="red" />
            )}
          </Pressable>
        </View>

        <Text className="text-xs text-gray-700">
          {`Disponibilidad: ${product.stock} unidades`}
        </Text>
        <Text className="text-xs text-gray-700">
          {`Categoria": ${product.category.name}`}
        </Text>

        <View>
          {product.discount > 0 ? (
            <View className="justify-end">
              <View
                className="flex relative top-2 flex-row justify-end items-center"
                style={{ gap: 3 }}
              >
                <Text className="text-xs text-right line-through text-red-700">
                  {`${showCurrency(product.sale_price)}`}
                </Text>
                <Text className="text-xs text-red-700">
                  {`(-${(product.discount * 100).toFixed(0)}%)`}
                </Text>
              </View>
              <Text className="font-semibold text-green-700 text-right mt-2">
                {`${showCurrency(product.sale_price * (1 - product.discount))}`}
              </Text>
            </View>
          ) : (
            <View className="justify-end">
              <Text className="flex relative text-xs text-right mt-2 text-gray-700">
                No aplica descuento
              </Text>
              <Text className="font-semibold text-green-700 text-right">
                {`${showCurrency(product.sale_price)}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
