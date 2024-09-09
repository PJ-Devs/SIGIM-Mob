
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/AntDesign"; 
import { styles } from "./SearchBar.styles";

type CustomSearchProps = {
  initialText?: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({
  initialText = "",
  onSearch,
}: CustomSearchProps) {
  const [query, setQuery] = useState(initialText);

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <Icon name="search1" size={20} color="#888"  />
      <TextInput
        autoCorrect={false}
        autoFocus
        placeholder="Search"
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onEndEditing={handleSearch}
        style={styles.input}
        selectionColor="lawngreen"
        underlineColorAndroid="transparent" 
        keyboardType="visible-password"
      />
        
    </View>
  );
}
