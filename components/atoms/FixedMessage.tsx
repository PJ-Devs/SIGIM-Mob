import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { fixedMessageStyles } from "../../tokens";
import CustomButton from "./CustomButton";
import { useState } from "react";

interface FixedMessageProps {
  title: string;
  message?: string;
  position?: "top" | "bottom";
  type?: "success" | "error" | "warning" | "info";
  closeable?: boolean;
}

const typeIcons = {
  success: {
    name: "check-circle",
    color: "green",
  },
  error: {
    name: "exclamation",
    color: "red",
  },
  warning: {
    name: "exclamation-triangle",
    color: "darkorange",
  },
  info: {
    name: "info-circle",
    color: "lightblue",
  },
};

export default function FixedMessage({
  title,
  message = "",
  position = "top",
  type = "info",
  closeable = false,
}: FixedMessageProps): JSX.Element {
  const [visible, setVisible] = useState(true);

  return (
    <View
      className={`z-20 w-full flex-row justify-between items-center py-1.5 pl-3 pr-1 rounded-lg shadow-md bg-gray-50
      ${position === "top" ? "absolute top-1" : "absolute bottom-1"}
      ${fixedMessageStyles[type]}
      ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <View className="flex-row items-center" style={{ gap: 10, flex: 1 }}>
        <Icon
          name={typeIcons[type].name}
          size={32}
          color={typeIcons[type].color}
        />
        <View>
          <Text className="font-bold text-sm">{title}</Text>
          <Text className="shrink grow text-xs">{message}</Text>
        </View>
      </View>
      <CustomButton
        type="icon"
        icon="times"
        iconSize={24}
        iconColor="black"
        onPress={() => setVisible(false)}
      />
    </View>
  );
}
