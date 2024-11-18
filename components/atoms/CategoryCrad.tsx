import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Category } from "../../types/products";
import CustomButton from "./CustomButton";

interface CategoryCardProps {
  category: Category;
  onPress: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isActive: boolean;
}

export default function CategoryCard({
  category,
  onPress,
  onEdit,
  onDelete,
  isActive,
}: CategoryCardProps): JSX.Element {
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isActive ? 1 : 0,
      duration: 120,
      useNativeDriver: false,
    }).start();

    if (isActive) {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: -10,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#EBF8FF"],
  });

  const interpolatedBorderColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#3182CE"],
  });

  return (
    <Animated.View
      style={{
        backgroundColor: interpolatedBackgroundColor,
        borderColor: interpolatedBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 6,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    >
      <Pressable onPress={() => onPress(category.id)}>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold">{category.name}</Text>
          <Animated.View
            style={{
              flexDirection: "row",
              opacity: buttonOpacity,
              transform: [{ translateY: buttonTranslateY }],
              gap: 8,
            }}
          >
            <CustomButton
              style="flex justify-center items-center bg-orange-300 p-2 rounded-full shadow-sm"
              type="icon"
              icon="pen"
              iconColor="white"
              iconSize={16}
              onPress={() => onEdit(category.id)}
            />
            <CustomButton
              style="flex justify-center items-center bg-red-400 p-2 rounded-full shadow-sm"
              type="icon"
              iconColor="white"
              iconSize={16}
              icon="trash"
              onPress={() => onDelete(category.id)}
            />
          </Animated.View>
        </View>
        <Text className="text-gray-700">{category.description}</Text>
      </Pressable>
    </Animated.View>
  );
}
