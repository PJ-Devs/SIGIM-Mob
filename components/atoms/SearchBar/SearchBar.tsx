import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import Icon from "@expo/vector-icons/AntDesign";

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
    <View className="flex flex-row gap-2 items-center rounded-md p-2">
      <Icon name="search1" size={20} color="#888"  />
      <TextInput
        autoCorrect={false}
        autoFocus
        placeholder="Search"
        placeholderTextColor="secondary"
        value={query}
        onChangeText={setQuery}
        onEndEditing={handleSearch}
        className="flex-1 pl-2 h-10 w-2 bg-transparent border-b-0 rounded-md"
        selectionColor="lawngreen"
        underlineColorAndroid="transparent" 
        keyboardType="visible-password"
      />
    </View>
  );
}
