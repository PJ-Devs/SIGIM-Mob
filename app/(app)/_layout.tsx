import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

export default function AppLayout(): JSX.Element {
  const { authState } = useAuth();

  if(!authState) {
    return <Redirect href="/login" />;
  }

  return (
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
  );
}