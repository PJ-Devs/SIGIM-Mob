import { Animated, GestureResponderEvent, Pressable, Text } from "react-native";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colorPalette } from "../../styles/common.styles";
import { useRef } from "react";

type buttonType =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "success"
  | "icon"
  | "default";
type buttonShape = "rounded" | "default";

interface CustomButtonProps {
  id?: string;
  title?: string;
  style?: string;
  type?: buttonType;
  shape?: buttonShape;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  visible?: boolean;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
  onPress: (event?: GestureResponderEvent) => void;
}

export default function CustomButton({
  type = "default",
  shape = "default",
  iconSize = 14,
  visible = true,
  disabled = false,
  loading = false,
  testID,
  ...props
}: CustomButtonProps): JSX.Element {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const fadeInAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOutAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Pressable
      id={props.id ?? undefined}
      onPressIn={fadeInAnimation}
      onPressOut={fadeOutAnimation}
      onPress={props.onPress}
      disabled={disabled || loading}
      testID={testID}
      className={` 
        ${typeStyles[type]} ${shapeStyles[shape]} ${disabled || loading ? "opacity-50" : "opacity-100"} ${props.style ?? "py-2 px-3 shadow-sm"} "felx-1 flex-row justify-center items-center"`}
    >
      <Animated.View
        className="flex-row gap-x-1.5 justify-center items-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {loading && type !== "icon" && (
          <LottieView
            source={require("../../assets/animations/loading-animation.json")}
            autoPlay
            loop
            speed={5}
            resizeMode="contain"
            style={{
              width: 50,
              height: 50,
              marginHorizontal: -14,
              marginVertical: -14,
            }}
          />
        )}
        {props.icon && (
          <Icon
            name={props.icon}
            size={iconSize}
            color={props.iconColor ?? colorPalette.dark}
          />
        )}
        {props.title && type !== "icon" && (
          <Text
            className={`text-center font-semibold text-base ${
              type === "error" ? `text-white` : "text-black"
            }`}
          >
            {props.title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const shapeStyles = {
  default: "rounded-md",
  rounded: "rounded-lg",
};

const typeStyles = {
  default: "bg-[#FFF]",
  primary: "bg-primary",
  secondary: "bg-secondary border border-dark",
  error: "bg-danger",
  warning: "bg-warning",
  success: "bg-success",
  icon: "bg-transparent rounded-full z-10",
};
