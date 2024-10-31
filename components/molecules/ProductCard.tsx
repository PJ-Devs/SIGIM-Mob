import { Text, View, Image, Pressable } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { Product } from "../../types/products";
import LottieView from "lottie-react-native";
import { SIZES } from "../../utils/consts";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onPress?: () => void;
}

export default function ProductCard({
  product,
  isFavorite = false,
  onPress,
}: ProductCardProps): JSX.Element {
  const [isFav, setIsFav] = useState<boolean>(isFavorite);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFavorite = () => {
    setIsFav(!isFav);
  };

  return (
    <Pressable
      onPress={onPress}
      className="flex-row bg-white w-full gap-x-2 py-2 px-4 rounded-lg shadow-sm"
    >
      {loading && (
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
        className="w-1/3 h-30"
        source={{
          uri: `${process.env.EXPO_PUBLIC_SERVER_URL}/${product.thumbnail}`,
        }}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      />

      <View className="w-2/3 pl-2 pr-3">
        <View className="flex-row justify-between items-center gap-x-2 mb-1">
          <Text className="font-semibold shrink grow">{product.name}</Text>
          <Pressable onPress={handleFavorite}>
            {isFav ? (
              <Icon name="heart" size={22} color="red" />
            ) : (
              <Icon name="hearto" size={22} color="red" />
            )}
          </Pressable>
        </View>
        <Text>{`Categoria:`}</Text>
        <Text>{`Marca:`}</Text>
        <Text>{`Cantidad: ${product.stock}`}</Text>
        <Text className="font-semibold text-green-600 text-right mt-2">{`$${product.sale_price}`}</Text>
      </View>
    </Pressable>
  );
}
