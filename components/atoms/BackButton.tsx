import { router } from "expo-router";
import CustomButton from "./CustomButton";

interface BackButtonProps {
  onPress?: () => void;
}

export default function BackButton({ onPress }: BackButtonProps): JSX.Element {
  return (
    <CustomButton
      type="icon"
      icon="arrow-left"
      iconSize={24}
      onPress={
        onPress ||
        (() => {
          if (router.canGoBack()) {
            router.back();
          }
        })
      }
      style="rounded-full border-[1px] border-solid border-gray-700 p-2 bg-white shadow-sm shadow-gray-200"
    />
  );
}
