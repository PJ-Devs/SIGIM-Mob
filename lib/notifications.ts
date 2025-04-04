import messaging from "@react-native-firebase/messaging";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = await messaging().getToken();
    console.log("Device Token:", token);
  } else {
    console.log("Not allowed to send notifications");
    return false;
  }
};

