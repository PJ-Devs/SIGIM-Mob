import { Animated, Easing, View } from "react-native";
import Header from "../molecules/Header";
import SearchBar from "../atoms/SearchBar";
import CategoriesCarrousel from "./CategoriesCarrousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";

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
    <SafeAreaView className={`min-w-[90%] min-h-full flex-1 px-3`}>
      <View className="py-1">
        {includeHeader && <Header enterpriseName="La empresita" />}
        {includeSearch && onSearch && (
          <View>
            <SearchBar onSearch={onSearch} />
            <CategoriesCarrousel />
          </View>
        )}
      </View>
      {/* {(router.canGoBack() && canGoBack) && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          iconSize={20}
          onPress={() => {
            router.back();
          }}
          style="absolute top-16 left-10 p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )} */}
      {children}
    </SafeAreaView>
  );
}
