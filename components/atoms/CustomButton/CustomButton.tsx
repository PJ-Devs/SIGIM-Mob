import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { defaultStyles, shapeStyles, typeStyles } from "./CustomButton.styles";
import { colorPalette } from "../../../styles/common.styles";

/**
 * In case you need to use icons for your button, u can use any of the following:
 * https://oblador.github.io/react-native-vector-icons/ (FontAwesome5 Only)
 */

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
  titleStyle?: TextStyle;
  style?: ViewStyle;
  type?: buttonType;
  shape?: buttonShape;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  visible?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress: (event?: GestureResponderEvent) => void;
};

export default function CustomButton({
  type = "default",
  shape = "default",
  iconSize = 14,
  visible = true,
  disabled = false,
  loading = false,
  ...props
}: CustomButtonProps): JSX.Element {
  return (
    <Pressable
      id={props.id ?? undefined}
      onPress={props.onPress}
      disabled={disabled || loading}
      style={
        props.style
          ? {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              ...props.style,
            }
          : {
              ...defaultStyles.baseStyle,
              ...shapeStyles[shape],
              ...typeStyles[type],
              display: visible ? "flex" : "none",
              opacity: disabled || loading ? 0.65 : 1,
            }
      }
    >
      {loading && type !== "icon" && (
        <LottieView
          source={require("../../../assets/animations/loading-animation.json")}
          autoPlay
          loop
          speed={5}
          resizeMode="contain"
          style={defaultStyles.loadingAnimation}
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
        <Text style={props.titleStyle ? props.titleStyle : defaultStyles.title}>
          {props.title}
        </Text>
      )}
    </Pressable>
  );
}
