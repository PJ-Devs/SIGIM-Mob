import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { SQLiteProvider } from "expo-sqlite/next";
import {
  authInterceptor,
  errorInterceptor,
} from "../lib/axios/axios.interceptors";

authInterceptor();
errorInterceptor();

export default  function layout () {

  return (
    <SQLiteProvider databaseName="test.db">
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
    </SQLiteProvider>
  );
}
