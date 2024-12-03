import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { SQLiteProvider } from "expo-sqlite";
import {
  authInterceptor,
  errorInterceptor,
} from "../lib/axios/axios.interceptors";
import { initializeDB } from "../lib/sqlite";
import Toast from "react-native-toast-message";
import { toastConfig } from "../lib/toast/toastify";
import { requestUserPermission } from "../lib/notifications";
import { usePushNotifications } from "../contexts/usePushNotifications";

authInterceptor();
errorInterceptor();

export default function layout () {
  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Toast.show({
        type: "info",
        text1: remoteMessage.notification?.title ?? "Nuevo mensaje",
        text2: remoteMessage.notification?.body ?? "Nuevo mensaje",
        visibilityTime: 3000,
        swipeable: true,
        text1Style: { fontSize: 16 },
        text2Style: { fontSize: 14 },
        topOffset: 60,
      });
    });

    console.log(expoPushToken?.data || "");
    console.log(expoPushToken);
    return unsubscribe;

  }, []);

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
      </AuthProvider>
      <Toast config={toastConfig} />
    </SQLiteProvider>
  );
}
