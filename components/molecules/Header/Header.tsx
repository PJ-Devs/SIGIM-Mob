import { Text, View } from "react-native";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Link } from "expo-router";

interface props {
  enterpriseName: string;
}

export default function Header({ enterpriseName }: props): JSX.Element {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        paddingVertical: 15,
        gap: 10,
      }}
    >
      <CustomButton type="icon" icon="bars" iconSize={20} onPress={() => {}} />
      <Link href={"/"}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Icon name="home" size={18} />
          <Text>{enterpriseName}</Text>
        </View>
      </Link>
      <CustomButton type="icon" icon="cog" iconSize={20} onPress={() => {}} />
    </View>
  );
}
