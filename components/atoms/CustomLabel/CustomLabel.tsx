import React from "react";
import { Text, StyleSheet, TextStyle, ViewStyle } from "react-native";

type CustomLabelProps = {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
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
  style = {},
}: CustomLabelProps) {
  return (
    <Text
      style={[
        styles.label,
        {
          color,
          fontSize,
          fontWeight,
          backgroundColor,
          padding,
          margin,
          borderRadius,
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    fontFamily: "Arial",
  },
});
