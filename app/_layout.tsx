import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { SQLiteProvider } from "expo-sqlite";
import {
  authInterceptor,
  errorInterceptor,
} from "../lib/axios/axios.interceptors";
import { initializeDB } from "../lib/sqlite";
import Toast from "react-native-toast-message";
import { toastConfig } from "../lib/toast/toastify";

authInterceptor();
errorInterceptor();

export default function layout () {
  return (
    <SQLiteProvider databaseName="test.db" onInit={initializeDB}>
      <AuthProvider>
        <Stack
          screenOptions={{
            animation: "ios_from_right",
            contentStyle: {
              flex: 1,
              justifyContent: "center",
              backgroundColor: "white",
            },
            headerShown: false,
          }}
        />
        <Toast config={toastConfig} />
      </AuthProvider>
    </SQLiteProvider>
  );
}
