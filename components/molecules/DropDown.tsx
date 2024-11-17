import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { dropDownContainerStyle } from "../../tokens";
import Icon from "react-native-vector-icons/FontAwesome5";

interface DropdownProps {
  data: { label: string; value: string }[];
  placeholder?: string;
  label?: string;
  icon?: string;
  maxHeight?: number;
  searchable?: boolean;
  closeModalWhenSelectedItem?: boolean;
}

export default function DropdownComponent({
  data,
  placeholder = "Selecciona una opción",
  label = "Dropdown",
  icon = "Safety",
  maxHeight = 300,
  searchable = true,
  closeModalWhenSelectedItem = true,
}: DropdownProps): JSX.Element {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: "#4C9DFF" }]}>
        {label}
      </Text>
    );
  };

  return (
    <View className={dropDownContainerStyle}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#4C9DFF" }]}
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
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Icon
            style={styles.icon}
            color={isFocus ? "#4C9DFF" : "#000000"}
            name={icon}
            size={20}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
    // shadowColor: "#000000",
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // shadowOffset: { width: 0, height: 3 },
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
