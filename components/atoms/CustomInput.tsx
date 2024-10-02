import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { inputStlye } from "../../tokens";
import { Controller } from "react-hook-form";

type CustomInputProps = {
  placeholder: string;
  control: any;
  rules?: any;
  propertyName: string;
  type?: KeyboardTypeOptions;
};

export default function CustomInput({
  placeholder,
  control,
  propertyName,
  type = "default",
  rules = {},
}: CustomInputProps) {
  return (
    <Controller
      control={control}
      name={propertyName}
      rules={rules}
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
            onChangeText={(text) => {
              onChange(text);
            }}
            onBlur={onBlur}
          />
          {error && (
            <Text className="text-red-600 text-start">
              {error.message || "Error"}
            </Text>
          )}
        </View>
      )}
    />
  );
}
