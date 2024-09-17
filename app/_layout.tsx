import { Stack } from "expo-router";
import Layout from "../components/orgnisms/Layout";

export default function layout() {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
        contentStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        },
        animationDuration: 250,
        headerShown: false,
      }}
    />
  );
}
