import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { dropDownContainerStyle } from "../../tokens";
import Icon from "react-native-vector-icons/FontAwesome5";

interface DropdownProps {
  data: { label: string; value: string }[];
  initialValue?: { label: string; value: string };
  placeholder?: string;
  label?: string;
  icon?: string;
  maxHeight?: number;
  searchable?: boolean;
  closeModalWhenSelectedItem?: boolean;
  error?: boolean;
  errorMessage?: string;
  emitValue: (value: string) => void;
}

export default function DropdownComponent({
  data,
  initialValue,
  placeholder = "Selecciona una opción",
  label = "Dropdown",
  icon = "Safety",
  maxHeight = 300,
  searchable = true,
  closeModalWhenSelectedItem = true,
  error = false,
  errorMessage = "",
  emitValue,
}: DropdownProps): JSX.Element {
  const [value, setValue] = useState<string | null>(initialValue?.value ?? null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text
        style={[
          styles.label,
          error && value === null && { color: "red" },
          isFocus && { color: "#4C9DFF" },
        ]}
      >
        {label}
      </Text>
    );
  };

  return (
    <View className={dropDownContainerStyle}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          error && value === null && { borderColor: "red" },
          isFocus && { borderColor: "#4C9DFF" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={searchable}
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        closeModalWhenSelectedItem={closeModalWhenSelectedItem}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          emitValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Icon
            style={styles.icon}
            color={
              isFocus ? "#4C9DFF" : error && value === null ? "red" : "#000000"
            }
            name={icon}
            size={20}
          />
        )}
      />
      {error && value === null && (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
    shadowColor: "#C4C4C4",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 8,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9E9E9E",
    fontFamily: "Roboto",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#333333",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#333333",
  },
});
