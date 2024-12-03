import { View, Image, ImageSourcePropType } from "react-native";
import { circularLogoContainerStyle } from "../../tokens";
import { SIZES } from "../../utils/consts";
import { useState } from "react";
import LottieView from "lottie-react-native";

type CircularLogoProps = {
  img: ImageSourcePropType;
  alt: string;
};

export default function CircularLogo({ img, alt }: CircularLogoProps) {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <View
      className={circularLogoContainerStyle}
    >
      {loading && (
        <LottieView
          source={require("../../assets/animations/image-loader.json")}
          autoPlay
          loop
          speed={1.5}
          resizeMode="cover"
          style={{ width: SIZES.width * 0.2, height: SIZES.width * 0.2 }}
        />
      )}
      {img ? (
        <Image
          alt={alt}
          resizeMode="contain"
          style={{ width: SIZES.width * 0.2, height: SIZES.width * 0.2 }}
          source={img}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      ) : (
        <Image
          alt={alt}
          resizeMode="contain"
          style={{ width: SIZES.width * 0.2, height: SIZES.width * 0.2 }}
          source={img}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      )}
    </View>
  );
}
