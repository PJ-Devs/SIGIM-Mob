import React from "react";
import { View, Text, Pressable } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

interface CardProps {
  color?: string;
  link: string;
  linkText: string;
}

export default function SectionCard({
  color,
  link,
  linkText,
}: CardProps): JSX.Element {
  const linkTo = useLinkTo();

  return (
    <LinearGradient
      colors={["#EEE", "#39CDCD"]}
      start={[0.01, 0.9]}
      dither={true}
      style={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width:290,
        height:160
      }}
    >
      <Pressable onPress={() => linkTo(link)}>
        <Text className="text-white text-xl tracking-widest uppercase">
          {" "}
          {/* Quitamos el subrayado */}
          {linkText}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}
