import { Stack, Slot } from "expo-router";

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
        headerShown: false,
      }}
    />
  );
}
