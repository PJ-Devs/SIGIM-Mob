import { View } from "react-native";
import Header from "../../molecules/Header/Header";
import SearchBar from "../../atoms/SearchBar/SearchBar";

interface LayoutProps {
  includeHeader?: boolean;
  includeSearch?: boolean;
  onSearch?: (query: string) => void;
  children: React.ReactNode;
}

export default function Layout({
  includeHeader = true,
  includeSearch = false,
  onSearch,
  children,
}: LayoutProps) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View style={{
        paddingBottom: 5,
      }}>
        {includeHeader && <Header enterpriseName="La empresita" />}
        {(includeSearch && onSearch) && <SearchBar onSearch={onSearch} />}
      </View>
      {children}
    </View>
  );
}
