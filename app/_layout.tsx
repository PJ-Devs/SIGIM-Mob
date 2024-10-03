import { Stack, Slot } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";

export default function layout() {
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
