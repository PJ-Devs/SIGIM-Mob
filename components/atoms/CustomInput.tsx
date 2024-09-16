import { KeyboardTypeOptions, TextInput } from "react-native";
import { inputStlye } from "../../tokens";

type CustomInputProps = {
    placeholder: string,
    value?: string,
    type?: KeyboardTypeOptions,
    width?: number,
}

export default function CustomInput({placeholder, value, type = "default", width = 200}: CustomInputProps){
    return(
        <TextInput
            className = {inputStlye}
            placeholder={placeholder}
            value={value}
            keyboardType={type}
        />
    );
}
