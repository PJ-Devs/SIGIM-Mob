import { ScrollView, View } from "react-native";
import Header from "../../molecules/Header/Header";
import { Children } from "react";

interface LayoutProps {
  includeHeader?: boolean;
  children: React.ReactNode;
}

export default function Layout({ includeHeader = true, children }: LayoutProps) {
  return (
    <View style={{ flex: 1, padding: 5 }}>
      {includeHeader && <Header enterpriseName="La empresita" />}
      <ScrollView contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}>
        {children}
      </ScrollView>
    </View>
  );
}