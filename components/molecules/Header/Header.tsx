import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome5";

interface props {
  enterpriseName: string;
}

export default function Header({
  enterpriseName,
}: props): JSX.Element {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        width: "95%",
        paddingVertical: 30,
        gap: 10,
      }}
    >
      <CustomButton
        type="icon"
        icon="bars"
        iconSize={20}
        onPress={() => console.log(1)}
      />
      <View style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
      }}>
        <Icon name="home" size={17} />
        <Text>{enterpriseName}</Text>
      </View>
      <CustomButton
        type="icon"
        icon="cog"
        iconSize={20}
        onPress={() => console.log(1)}
      />
    </View>
  );
}
