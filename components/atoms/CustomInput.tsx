import { KeyboardTypeOptions, TextInput } from "react-native";
import { inputStlye } from "../../tokens";

type CustomInputProps = {
    placeholder: string,
    value?: string,
    type?: KeyboardTypeOptions,
    width?: number,
    onChangeText?: (text: string) => void;
}

export default function CustomInput({placeholder, value, type = "default", width = 200, onChangeText}: CustomInputProps){
    return(
        <TextInput
            className = {inputStlye}
            placeholder={placeholder}
            value={value}
            keyboardType={type}
            onChangeText={onChangeText}
        />
    );
}
