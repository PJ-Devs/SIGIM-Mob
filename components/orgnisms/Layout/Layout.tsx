import { View } from "react-native";
import Header from "../../molecules/Header/Header";

interface LayoutProps {
  includeHeader?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  includeHeader = true,
  children,
}: LayoutProps) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      {includeHeader && <Header enterpriseName="La empresita" />}
      {children}
    </View>
  );
}
