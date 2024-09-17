import { Text, View } from "react-native";
import CustomButton from "../atoms/CustomButton";
import { Link, router, usePathname } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";

interface props {
  enterpriseName: string;
}

export default function Header({ enterpriseName }: props): JSX.Element {

  return (
    <View className="flex-row justify-between items-center bg-white w-full pb-2">
      <CustomButton
        type="icon"
        icon={router.canGoBack() ? "arrow-left" : "bars"}
        iconSize={20}
        onPress={() => {
          if(router.canGoBack()) {
            router.back()
          } else {
            router.navigate('/')
          }
        }}
        style="p-2.5 rounded-full border-[1px] border-solid border-dark z-10 shadow-md"
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
        onPress={() => {
          console.log(1)
          router.push("/login")
        }}
        style="p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
      />
    </View>
  );
}
