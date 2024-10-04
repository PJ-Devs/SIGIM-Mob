import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AppLayout(): JSX.Element {
  return <Stack screenOptions={{
    animation: "ios",
    contentStyle: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "white",
    },
    headerShown: false,
  }} />;
}
