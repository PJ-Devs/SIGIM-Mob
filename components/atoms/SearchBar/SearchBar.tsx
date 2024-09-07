import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet } from "react-native";

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
    <TextInput
      autoCorrect={false}
      autoFocus
      placeholder="Search"
      placeholderTextColor="#888"
      value={query}
      onChangeText={setQuery}
      onEndEditing={handleSearch}
      style={styles.input}
      inlineImageLeft="search_icon"
      selectionColor="red"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    fontSize: 16,
    color: "#333",
  },
});
