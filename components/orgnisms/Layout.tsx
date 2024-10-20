import { View } from "react-native";
import Header from "../molecules/Header";
import SearchBar from "../atoms/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import { SIZES } from "../../utils/consts";

interface LayoutProps {
  includeHeader?: boolean;
  includeSearch?: boolean;
  canGoBack?: boolean;
  onSearch?: (query: string) => void;
  children: React.ReactNode;
}


export default function Layout({
  includeHeader = true,
  includeSearch = false,
  canGoBack = true,
  onSearch,
  children,
}: LayoutProps) {
  return (
    <SafeAreaView
    className={`flex-1`}
    style={{
      width: SIZES.width * 0.85,
      minHeight: SIZES.height * 0.85,
    }}
    >
      <View className="py-1">
        {includeHeader && <Header enterpriseName="La empresita" />}
        {includeSearch && onSearch && (
          <View>
            <SearchBar onSearch={onSearch} />
          </View>
        )}
      </View>
      {(router.canGoBack() && canGoBack) && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          iconSize={20}
          onPress={() => {
            router.back();
          }}
          style="absolute top-16 p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}
      {children}
    </SafeAreaView>
  );
}
