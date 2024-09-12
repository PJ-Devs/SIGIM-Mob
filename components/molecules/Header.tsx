import { Text, View } from "react-native";
import CustomButton from "../atoms/CustomButton";
import { Link, router, usePathname } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";

interface props {
  enterpriseName: string;
}

export default function Header({ enterpriseName }: props): JSX.Element {
  const pathname = usePathname();

  return (
    <View className="flex-row justify-between items-center bg-white w-full pt-4 pb-2">
      <CustomButton
        type="icon"
        icon={pathname === "/" ? "bars" : "arrow-left"}
        iconSize={20}
        onPress={() => {
          if (pathname === "/") {
            // Open sidebar
          } else if (router.canGoBack()) {
            router.back();
          }
        }}
      />
      <Link href={"/"}>
        <View className="flex-row items-center gap-x-2">
          <Icon name="home" size={18} />
          <Text>{enterpriseName}</Text>
        </View>
      </Link>
      <CustomButton
        type="icon"
        icon="cog"
        iconSize={20}
        onPress={() => router.push("/login")}
      />
    </View>
  );
}
