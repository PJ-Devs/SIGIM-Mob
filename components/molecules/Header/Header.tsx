import { Text, View } from "react-native";
import CustomButton from "../../atoms/CustomButton/CustomButton";
import { Link, router, usePathname } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";

interface props {
  enterpriseName: string;
}

export default function Header({ enterpriseName }: props): JSX.Element {
  const pathname = usePathname();

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
      <CustomButton
        type="icon"
        icon={pathname === "/" ? "bars" : "arrow-left"}
        iconSize={20}
        onPress={() => {
          if(pathname === "/") {
            // Open sidebar
          } else if(router.canGoBack()) {
            router.back();
          }
        }}
      />
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
      <CustomButton type="icon" icon="cog" iconSize={20} onPress={() => router.push('/login')} />
    </View>
  );
}
