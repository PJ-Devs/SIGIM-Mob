import {
  Text,
  View,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useState } from "react";

interface ProductCardProps {
  name: string;
  price: number;
  image?: ImageSourcePropType;
  isFavorite?: boolean;
}

export default function ProductCard({
  name,
  price,
  image,
  isFavorite = false,
}: ProductCardProps): JSX.Element {
  const [isFav, setIsFav] = useState<boolean>(isFavorite);

  const handleFavorite = () => {
    setIsFav(!isFav);
  };

  return (
    <Pressable
      onPress={() => {}}
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        width: "90%",
        gap: 5,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      }}
    >
      <Image
        alt="Image"
        style={{
          width: "35%",
          borderRadius: 10,
          backgroundColor: "gray",
        }}
        source={image ?? { uri: "https://via.placeholder.com" }}
      />
      <View
        style={{
          width: "65%",
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {name}
          </Text>
          <Pressable onPress={() => handleFavorite()}>
            {isFav ? (
              <Icon name="heart" size={22} color="red" />
            ) : (
              <Icon name="hearto" size={22} color="red" />
            )}
          </Pressable>
        </View>
        <Text>{"Ctagoria: Categoria"}</Text>
        <Text>{"Manofactura: Manofactura"}</Text>
        <Text>{"Unidades: 10"}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "green",
            textAlign: "right",
            marginTop: 5,
          }}
        >
          {`$${price} COP`}
        </Text>
      </View>
    </Pressable>
  );
}
