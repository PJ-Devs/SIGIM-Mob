import { router } from "expo-router";
import CustomButton from "./CustomButton";

export default function ProfileButton(): JSX.Element {
  return (
    <CustomButton
      type="icon"
      icon="user"
      iconSize={24}
      onPress={() => router.push("/profile")}
      style="rounded-full border-[1px] border-solid border-gray-700 p-2 bg-white shadow-sm shadow-gray-200"
    />
  );
}
