import { Text, View, Image, ImageSourcePropType } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";

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
  return (
    <View>
      <Image alt="Image" />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text>{name}</Text>
          {isFavorite ? (
            <Icon name="heart" size={16} color="red" />
          ) : (
            <Icon name="hearto" size={16} color="red" />
          )}
        </View>
        <View></View>
      </View>
    </View>
  );
}
