import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";
import { deleteSecuredItem } from "../utils/secureStore";

export default function RootLayout() {
  deleteSecuredItem("ACCESS_TOKEN");

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
