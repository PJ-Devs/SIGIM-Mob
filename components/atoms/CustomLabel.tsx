import React from "react";
import { Text, TextStyle, ViewStyle } from "react-native";

type CustomLabelProps = {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  backgroundColor?: string;
  padding?: number;
  margin?: number;
  borderRadius?: number;
  style?: TextStyle | ViewStyle;
};

export default function CustomLabel({
  text,
  color = "black",
  fontSize = 16,
  fontWeight = "normal",
  backgroundColor = "transparent",
  padding = 8,
  margin = 4,
  borderRadius = 4,
}: CustomLabelProps) {
  const styles = `text-${color} fontSize-${fontSize} fontWeight-${fontWeight}
  bg-${backgroundColor} p-${padding} m-${margin} border-radius-${borderRadius}`;
  return <Text className={styles}>{text}</Text>;
}
