import React from "react";
import { Text, Pressable } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { router } from "expo-router";

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
    <Pressable
      onPress={() => router.navigate(link)}
      className="w-[95%] shadow-md"
      style={{
        backgroundColor: "#39CDCD",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        height: 120,
      }}
    >
      <Text className="text-white text-2xl font-semibold tracking-widest uppercase">
        {" "}
        {linkText}
      </Text>
    </Pressable>
  );
}
