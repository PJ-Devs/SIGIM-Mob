import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";  
import { authInterceptor, errorInterceptor } from "../lib/axios/axios.interceptors";

authInterceptor();
errorInterceptor();

export default function RootLayout() {

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          animation: "ios",
          contentStyle: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signUp" />
      </Stack>
    </AuthProvider>
  );
}
