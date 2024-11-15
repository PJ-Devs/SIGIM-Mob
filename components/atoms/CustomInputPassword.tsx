import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { inputStlye } from "../../tokens";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CustomInputPasswordProps = {
  placeholder: string;
  control: any;
  trigger?: any,
  propertyName: string;
  secureTextEntry?: boolean;
  type?: KeyboardTypeOptions;
  errors?: any;
};

export default function CustomInputPassword({
  placeholder,
  control,
  trigger,
  propertyName,
  secureTextEntry = false,
  type = "default",
  errors
}: CustomInputPasswordProps) {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }


  return (
    <Controller
      control={control}
      name={propertyName}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            className={`${inputStlye} ${error ? "border-red-500" : ""}`}
            placeholder={placeholder}
            value={value}
            keyboardType={type}
            secureTextEntry={!showPassword}
            onChangeText={(text) => {
              onChange(text);
              if (trigger) trigger(propertyName); 
            }}
            onBlur={onBlur}
          />
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
            onPress={toggleShowPassword}
            style={{ position: "absolute", right: 10, top: 10 }}
          />
           {errors && (
            <Text className="text-red-600 text-start">
              {errors[propertyName]?.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
