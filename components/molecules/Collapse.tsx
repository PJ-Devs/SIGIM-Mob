import { useState, useRef, useEffect } from "react";
import { Pressable, Text, View, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface CollapseProps {
  title: string;
  collapsed?: boolean;
  children?: JSX.Element | null;
}

export default function CollapseComponent({
  title,
  collapsed = false,
  children = null,
}: CollapseProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsed);
  const [collapseHeight, setCollapseHeight] = useState<number>(0);
  const animationController = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    if (height < collapseHeight) {
      return;
    }
    setCollapseHeight(height);
  };

  const handleCollapse = () => {
    const baseAnimationConfig = {
      duration: 300,
      toValue: isCollapsed ? 1 : 0
    }
    setIsCollapsed((prev) => !prev);
    Animated.timing(animationController, {
      ...baseAnimationConfig,
      useNativeDriver: true,
    }).start();
    Animated.timing(heightAnim, {
      ...baseAnimationConfig,
      useNativeDriver: false,
    }).start();
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, collapseHeight],
  });

  useEffect(() => {
    if (collapsed) handleCollapse();
  }, [collapsed])

  return (
    <View className="w-full">
      <Pressable
        onPress={handleCollapse}
        className="flex-row justify-between items-center px-3 py-1.5 rounded-md shadow-sm bg-gray-200"
      >
        <Text className="text-lg">{title}</Text>
        <Animated.View
          style={{
            transform: [{ rotate: arrowTransform }],
          }}
        >
          <Icon name="angle-right" size={24} color="#000" />
        </Animated.View>
      </Pressable>
      <Animated.View
        style={{
          height: animatedHeight,
          overflow: "hidden",
        }}
      >
        <View
          className="min-h-[50px] bg-gray-50 rounded-b-md shadow-sm p-3 pt-5"
          onLayout={onLayout}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
