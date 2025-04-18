import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { dropDownContainerStyle } from "../../tokens";
import { Controller } from "react-hook-form";

/**
 * How to use Dropdown component in your project?
 * 
 * When you want to use Dropdown component you have to pass the data prop in this way:
 * <DropDown
          data={[
            { label: "Item 1", value: "1" },
            { label: "Item 2", value: "2" },
            { label: "Item 3", value: "3" },
            { label: "Item 4", value: "4" },
            { label: "Item 5", value: "5" },
            { label: "Item 6", value: "6" },
            { label: "Item 7", value: "7" },
            { label: "Item 8", value: "8" },
          ]}
    />
 */

type dropDownProps = {
  name?: string
  data: { label: string; value: string }[];
  control: any;
  triger?: any;
  propertyName: string;
  errors?: any;
}

export default function DropdownCart({ name, data, control, propertyName, triger }: dropDownProps): JSX.Element {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <Controller
      control={control}
      name={propertyName}
      render={
        (
          {
            field: { onChange, onBlur, value },
            fieldState: { error },
          }
        ) => (
          <View className={dropDownContainerStyle}>
            {renderLabel()}
            < Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? (name ? name : "Select Item") : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                onChange(item.label);
                if (triger) triger(propertyName);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />
          </View >
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 0,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});