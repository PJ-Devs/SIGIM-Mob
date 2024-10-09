import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import {
  authInterceptor,
  errorInterceptor,
} from "../lib/axios/axios.interceptors";

authInterceptor();
errorInterceptor();

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
