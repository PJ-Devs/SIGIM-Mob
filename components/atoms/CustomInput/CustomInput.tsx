import { KeyboardTypeOptions, TextInput } from "react-native";
import { styles } from "./CustomInput.styles";

type CustomInputProps = {
    placeholder: string,
    value?: string,
    type?: KeyboardTypeOptions,
    width?: number,
}

export default function CustomInput({placeholder, value, type = "default", width = 200}: CustomInputProps){
    return(
        <TextInput
            style={{...styles.input, width: width}}
            placeholder={placeholder}
            value={value}
            keyboardType={type}
        />
    );
}