import Toast, {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from "react-native-toast-message";

const COLORS: { [key: string]: string } = {
  success: "#28a745",
  error: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
  light: "#ffffff",
  dark: "#212529",
};

export const showNotification = (type: string, title: string, message: string) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    visibilityTime: 3000,
    swipeable: true,
    topOffset: 60,
  });
}

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.success,
        backgroundColor: COLORS.light,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, zIndex: 9999 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.success,
      }}
      text2Style={{
        fontSize: 14,
        color: COLORS.dark,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: COLORS.error,
        backgroundColor: COLORS.light,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, zIndex: 9999 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.error,
      }}
      text2Style={{
        fontSize: 14,
        color: COLORS.dark,
      }}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: COLORS.info,
        backgroundColor: COLORS.light,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, zIndex: 9999 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.info,
      }}
      text2Style={{
        fontSize: 14,
        color: COLORS.dark,
      }}
    />
  ),
  warning: (props: BaseToastProps) => (
    <BaseToast
      activeOpacity={1}
      {...props}
      style={{
        borderLeftColor: COLORS.warning,
        backgroundColor: COLORS.light,
      }}
      contentContainerStyle={{ paddingHorizontal: 15, zIndex: 9999 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.warning,
      }}
      text2Style={{
        fontSize: 14,
        color: COLORS.dark,
      }}
    />
  ),
};
