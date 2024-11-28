import { Text, View } from "react-native";
import Layout from "../orgnisms/Layout";
import SectionCard from "../molecules/SectionCard";

export default function Sell(): JSX.Element {
  return (
    <Layout>
      <View style={{ flex: 1, alignItems:'center' }}>
        <SectionCard link="/orders" linkText="Mis ventas" />
      </View>
    </Layout>
  );
}
