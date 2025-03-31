import { View } from "react-native";
import LottieView from "lottie-react-native";
import { SIZES } from "../../utils/consts";

interface LoadingProps {
  size?: number;
  speed?: number;
}

export default function Loading({ size, speed }: LoadingProps) {
  return (
    <View className="absolute z-30 flex justify-center items-center" style={{
      width: SIZES.width,
      height: SIZES.height,
      backgroundColor: "rgba(0,0,0,0.03)"
    }}>
      <LottieView
        source={require("../../assets/animations/loading-animation.json")}
        autoPlay
        loop
        speed={speed ?? 5}
        resizeMode="cover"
        style={{ width: size ?? 100, height: size ?? 100 }}
      />
    </View>
  );
}
