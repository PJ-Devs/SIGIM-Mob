import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { inputStlye } from "../../tokens";
import { Controller } from "react-hook-form";

type CustomInputProps = {
  placeholder?: string;
  control: any;
  trigger?: any,
  propertyName: string;
  secureTextEntry?: boolean;
  type?: KeyboardTypeOptions;
  errors?: any;
  initialValue?: string
};

export default function CustomInput({
  placeholder = "",
  control,
  trigger,
  propertyName,
  secureTextEntry = false,
  type = "default",
  errors,
  initialValue = ""
}: CustomInputProps) {
  return (
    <Controller
      control={control}
      name={propertyName}
      render={({
        field: { onChange, onBlur, value = initialValue},
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
