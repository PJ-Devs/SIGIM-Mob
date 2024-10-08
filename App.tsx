import { StatusBar } from "expo-status-bar";
import Main from "./components/screens/Main";
import { authInterceptor, errorInterceptor } from "./lib/axios/axios.interceptors";
import { AuthProvider } from "./contexts/AuthContext";

authInterceptor();
errorInterceptor();

export default function App() {
  return (
    <AuthProvider>
        <StatusBar style="auto" />
        <Main />
    </AuthProvider>
  );
}
