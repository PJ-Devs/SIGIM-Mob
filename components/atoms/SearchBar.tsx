import { useState } from "react";
import { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

type CustomSearchProps = {
  initialText?: string;
  emitSearch: (query: string) => void;
  onSearch: () => void;
};

export default function SearchBar({
  initialText = "",
  emitSearch,
  onSearch,
}: CustomSearchProps) {
  const [query, setQuery] = useState(initialText);

  const handleSearch = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    e.preventDefault();
    console.log(1)
    onSearch();
  };

  return (
    <View className="flex border-[1px] border-dark px-2 rounded-full flex-row items-center">
      <Icon name="search" size={20} color="#888"  />
      <TextInput
        autoCorrect={false}
        placeholder="Buscar elementos"
        placeholderTextColor="secondary"
        value={query}
        onChangeText={(text) => {
          emitSearch(text);
          setQuery(text);
        }}
        className="flex-1 pl-2 h-10 w-2 rounded-md"
        selectionColor="black"
        underlineColorAndroid="transparent" 
        keyboardType="visible-password"
        onSubmitEditing={(e) => handleSearch(e)}
      />
    </View>
  );
}
