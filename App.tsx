import { View } from "react-native";
import {
  authInterceptor,
  errorInterceptor,
} from "./lib/axios/axios.interceptors";

authInterceptor();
errorInterceptor();

export default function App() {
  return <View></View>;
}
