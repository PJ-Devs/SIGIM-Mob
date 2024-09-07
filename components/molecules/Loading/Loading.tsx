import { View } from "react-native";
import LottieView from "lottie-react-native";

interface LoadingProps {
  size?: number;
  speed?: number;
}

export default function Loading({ size, speed }: LoadingProps) {
  return (
    <View style={{
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    }}>
      <LottieView
        source={require("../../../assets/animations/loading-animation.json")}
        autoPlay
        loop
        speed={speed ?? 5}
        resizeMode="cover"
        style={{ width: size ?? 100, height: size ?? 100 }}
      />
    </View>
  );
}
