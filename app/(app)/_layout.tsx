import { Stack } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function AppLayout(): JSX.Element {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View className="absolute inset-0 flex justify-center items-center w-full h-full">
        <LottieView
          source={require("../../assets/animations/loading-animation.json")}
          autoPlay
          loop
          speed={5}
          resizeMode="cover"
          style={{ width: 150, height: 150 }}
        />
    </View>
    )
  }

  return (
    <Stack screenOptions={{
      animation: "ios",
      contentStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      },
      headerShown: false,
    }} />
  );
}