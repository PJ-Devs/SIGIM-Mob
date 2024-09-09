import { Text, View, Image, Pressable } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import styles from "./ProductCard.styles";
import { Product } from "../../../types/products";

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

  const handleFavorite = () => {
    setIsFav(!isFav);
  };

  return (
    <Pressable onPress={() => {}} style={styles.card}>
      <Image
        alt="Image"
        style={styles.thumbnail}
        source={{
          uri: product.thumbnail,
        }}
      />
      <View style={styles.info}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{product.title}</Text>
          <Pressable onPress={() => handleFavorite()}>
            {isFav ? (
              <Icon name="heart" size={22} color="red" />
            ) : (
              <Icon name="hearto" size={22} color="red" />
            )}
          </Pressable>
        </View>
        <Text>{`Categoria: ${product.category}`}</Text>
        <Text>{`Marca: ${product.brand}`}</Text>
        <Text>{`Cantidad: ${product.stock}`}</Text>
        <Text style={styles.price}>{`$${product.price}`}</Text>
      </View>
    </Pressable>
  );
}
