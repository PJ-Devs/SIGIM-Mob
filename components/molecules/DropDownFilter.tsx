import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome5";

interface DropdownProps {
  data: { label: string; value: string }[];
  setFilter: (filter: string) => void;
  onSearch: (status: string) => void;
  placeholder?: string;
  icon?: string;
  maxHeight?: number;
  closeModalWhenSelectedItem?: boolean;
}

export default function DropDownFilter({
  data,
  setFilter,
  onSearch,
  placeholder = "Selecciona una opción",
  icon = "Safety",
  maxHeight = 300,
  closeModalWhenSelectedItem = true,
}: DropdownProps): JSX.Element {
  const [value, setValue] = useState<string | null>(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setFilter(data[0].value);
  }, []);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "#4C9DFF" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={maxHeight}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      closeModalWhenSelectedItem={closeModalWhenSelectedItem}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setFilter(item.value);
        onSearch(item.value);
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
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  icon: {
    marginRight: 8,
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
});
