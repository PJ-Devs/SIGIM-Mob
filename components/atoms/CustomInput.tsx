import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";
import { inputStlye } from "../../tokens";
import { Controller } from "react-hook-form";
import { SIZES } from "../../utils/consts";

type CustomInputProps = {
  placeholder?: string;
  label?: string;
  control: any;
  trigger?: any;
  propertyName: string;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  type?: KeyboardTypeOptions;
  errors?: any;
  initialValue?: string;
  testID?: string;
};

export default function CustomInput({
  placeholder = "",
  label,
  control,
  trigger,
  propertyName,
  secureTextEntry = false,
  type = "default",
  errors,
  initialValue = "",
  numberOfLines = 1,
  testID,
}: CustomInputProps) {
  return (
    <Controller
      control={control}
      name={propertyName}
      defaultValue={initialValue}
      render={({
        field: { onChange, onBlur, value = initialValue },
        fieldState: { error },
      }) => (
        <View className="w-full">
          {label && (
            <Text
              className={`absolute text-sm left-2 top-[-11px] bg-white z-10 px-1 font-semibold text-gray-800 ${
                errors && errors[propertyName] ? "text-red-500" : ""
              }`}
            >
              {label}
            </Text>
          )}
          <TextInput
            className={`${inputStlye} ${error ? "border-red-500" : ""}`}
            style={{
              maxWidth: "100%",
              height:
                numberOfLines > 1
                  ? SIZES.inputHeight * numberOfLines
                  : SIZES.inputHeight,
              flexWrap: "wrap",
            }}
            placeholder={placeholder}
            numberOfLines={numberOfLines}
            multiline={numberOfLines > 1}
            keyboardType={type}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={(text) => {
              onChange(text);
              if (trigger) trigger(propertyName);
            }}
            onBlur={onBlur}
            accessibilityLabel={testID}
            testID={testID}
          />
          {errors && errors[propertyName] && (
            <Text className="text-red-600 text-start mt-1">
              {errors[propertyName]?.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
