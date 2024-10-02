import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import Main from "./components/screens/Main";
import {
  authInterceptor,
  errorInterceptor,
} from "./lib/axios/axios.interceptors";
import { AuthProvider } from "./contexts/AuthContext";

authInterceptor();
errorInterceptor();

export default function App() {
  return (
    <AuthProvider>
      <View>
        <StatusBar style="auto" />
        <Main />
      </View>
    </AuthProvider>
  );
}
