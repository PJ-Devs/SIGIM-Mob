import { Text, TouchableOpacity } from "react-native";
import { useState } from "react";

type CategoryCardProps = {
  label: string;
  onRemove: () => void;
  onSelect: () => void;
  isSelected: boolean;
};

export default function CategoryTag({
  label,
  onRemove,
  onSelect,
  isSelected,
}: CategoryCardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleOnPress = () => {
    if (isActive) {
      onRemove();
    } else {
      onSelect();
    }

    setIsActive(!isActive);
  };

  return (
    <TouchableOpacity
      className={`bg-gray-100 rounded-md px-2 py-1 min-h-fit flex-row justify-around items-center transition-all duration-100 ${
        isActive ? "bg-gray-300 border-[1px] border-solid border-gray-700" : ""
      }`}
      onPress={() => handleOnPress()}
    >
      <Text className={`text-base text-center font-semibold text-gray-800`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
