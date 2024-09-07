import { Text, View, Image, Pressable } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import styles from "./ProductCard.styles";
import { Product } from "../../../types/products";
import { Link } from "expo-router";

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
    <Link href={`/product/${product.id}`}>
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
        <Text>{`Ctagoria: ${product.category}`}</Text>
        <Text>{`Manofactura: ${product.brand}`}</Text>
        <Text>{`Unidades: ${product.stock}`}</Text>
        <Text style={styles.price}>{`$${product.price}`}</Text>
      </View>
    </Link>
  );
}
