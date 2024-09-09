import React, { useEffect, useState } from "react";
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
  const [debounce, setDebounce] = useState<number>(500);
  const [query, setQuery] = useState(initialText);
  const isMounted = React.useRef(false);

  const handleSearch = () => {
    onSearch(query);
  };

  useEffect(() => {
    if(!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const timeout = setTimeout(() => {
      handleSearch();
    }, debounce);

    return () => clearTimeout(timeout);
  }, [query, debounce]);

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
