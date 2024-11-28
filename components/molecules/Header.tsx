import { Text, View } from "react-native";
import CustomButton from "../atoms/CustomButton";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigationState } from "@react-navigation/native";

interface props {
  enterpriseName: string;
  leftButton?: JSX.Element | null;
  rightButton?: JSX.Element | null;
}

export default function Header({
  enterpriseName,
  leftButton = null,
  rightButton = null,
}: props): JSX.Element {
  const { authState } = useAuth();

  return (
    <View className="flex-row justify-between bg-transparent items-center w-full pb-4">
      <View className="flex-1 items-start">
        {leftButton && <View>{leftButton}</View>}
      </View>
      <Link href={"/"} className="flex-1">
        <View className="flex-row items-center justify-center gap-x-2">
          <Icon name="home" size={24} />
          <Text className="text-lg font-semibold">{enterpriseName}</Text>
        </View>
      </Link>
      <View className="flex-1 items-end">
        {rightButton && <View>{rightButton}</View>}
      </View>
    </View>
  );
}
