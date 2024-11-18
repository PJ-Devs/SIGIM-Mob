import { useState } from "react";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

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
    <View className="flex border-[1px] border-dark px-2 rounded-full flex-row items-center">
      <Icon name="search" size={20} color="#888"  />
      <TextInput
        autoCorrect={false}
        placeholder="Buscar elementos"
        placeholderTextColor="secondary"
        value={query}
        onChangeText={setQuery}
        onEndEditing={handleSearch}
        className="flex-1 pl-2 h-10 w-2 rounded-md"
        selectionColor="black"
        underlineColorAndroid="transparent" 
        keyboardType="visible-password"
        onSubmitEditing={handleSearch}
      />
    </View>
  );
}
