import { View } from "react-native";
import SectionCard from "../molecules/SectionCard";
import { ScrollView } from "react-native";
import Layout from "../orgnisms/Layout";

export default function Main() {
  return (
    <Layout canGoBack={false}>
      <ScrollView>
        <View className="justify-center items-center py-4" style={{
          gap: 15,
        }}>
          <SectionCard link="/productList" linkText="Inventario" />
        </View>
      </ScrollView>
    </Layout>
  );
}