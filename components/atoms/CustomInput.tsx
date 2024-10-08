import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { inputStlye } from "../../tokens";
import { Controller } from "react-hook-form";

type CustomInputProps = {
  placeholder: string;
  control: any;
  rules?: any;
  trigger?: any,
  propertyName: string;
  secureTextEntry?: boolean;
  type?: KeyboardTypeOptions;
};

export default function CustomInput({
  placeholder,
  control,
  trigger,
  propertyName,
  secureTextEntry = false,
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
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => {
              onChange(text);
              if (trigger) trigger(propertyName); 
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
