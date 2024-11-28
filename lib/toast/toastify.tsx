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

type ToastType = "success" | "error" | "warning" | "info";

/**
 * Displays a toast notification with the specified type, title, and optional message.
 *
 * @param {string} type - The type of the notification (e.g., 'success', 'error').
 * @param {string} title - The title of the notification.
 * @param {string} [message] - The optional message of the notification.
 */
export const showNotification = (type: ToastType, title: string, message?: string) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    visibilityTime: 3000,
    swipeable: true,
    topOffset: 60,
  });
}

/**
 * Configuration object for different types of toast notifications.
 * Each property is a function that returns a customized toast component.
 *
 * @property {Function} success - Function to render a success toast.
 * @property {Function} error - Function to render an error toast.
 * @property {Function} info - Function to render an info toast.
 * @property {Function} warning - Function to render a warning toast.
 *
 * Each function accepts `BaseToastProps` as an argument and returns a toast component
 * with specific styles and properties:
 * - `style`: Custom styles for the toast container.
 * - `contentContainerStyle`: Styles for the content container within the toast.
 * - `text1Style`: Styles for the primary text in the toast.
 * - `text2Style`: Styles for the secondary text in the toast.
 */
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
