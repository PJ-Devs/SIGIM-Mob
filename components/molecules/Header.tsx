import { Text, View } from "react-native";
import CustomButton from "../atoms/CustomButton";
import { Link, router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigationState } from "@react-navigation/native";

interface props {
  enterpriseName: string;
  includeProfile?: boolean;
}

export default function Header({ enterpriseName }: props): JSX.Element {
  const { authState } = useAuth();
  const isProfileScreen = useNavigationState(
    (state) => state.routes[state.index].name === "profile"
  );

  const isHomeScreen = useNavigationState(
    (state) => state.routes[state.index].name === "index"
  );

  return (
    <View className="flex-row justify-between items-center bg-white w-full pb-2 px-2">
      <CustomButton
        type="icon"
        icon={router.canGoBack() ? "arrow-left" : "bars"}
        iconSize={20}
        onPress={() => {
          if (router.canGoBack()  && !isHomeScreen) {
            router.back();
          } else {
            router.navigate("/");
          }
        }}
        style="p-2.5 rounded-full border-[1px] border-solid border-dark z-10 shadow-md hideen"
      />
      <Link href={"/"}>
        <View className="flex-row items-center gap-x-2">
          <Icon name="home" size={18} />
          <Text>{enterpriseName}</Text>
        </View>
      </Link>
      {authState ? (
        <CustomButton
          type="icon"
          icon="user"
          iconSize={20}
          onPress={() => {
            if (isProfileScreen) {
              return;
            }
            router.push("/profile");
          }}
          style="p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
        />
      ) : (
        <CustomButton
          type="icon"
          icon="cog"
          iconSize={20}
          onPress={() => {
            router.replace("/login");
          }}
          style="p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}
    </View>
  );
}
