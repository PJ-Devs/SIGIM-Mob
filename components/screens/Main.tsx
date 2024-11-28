import { View } from "react-native";
import SectionCard from "../molecules/SectionCard";
import { ScrollView } from "react-native";
import Layout from "../orgnisms/Layout";
import ProfileButton from "../atoms/ProfileButton";

export default function Main() {
  return (
    <Layout rightButton={<ProfileButton />}>
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