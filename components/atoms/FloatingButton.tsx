import { useRef } from "react";
import { Animated, GestureResponderEvent, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface FloatingButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onPress: (event?: GestureResponderEvent) => void;
  testID?: string;
}

export default function FloatingButton({
  disabled = false,
  loading = false,
  testID,
  ...props
}: FloatingButtonProps): JSX.Element {
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
      testID={testID}
      onPress={props.onPress}
      onPressIn={fadeInAnimation}
      onPressOut={fadeOutAnimation}
      disabled={loading || disabled}
      className={`absolute p-4 rounded-full bg-primary bottom-2 right-2 shadow-lg ${disabled || loading ? "opacity-50" : "opacity-100"} `}
    >
      <Icon name="plus" size={30} />
    </Pressable>
  )
}