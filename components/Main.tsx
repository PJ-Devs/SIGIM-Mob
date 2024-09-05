import { View } from "react-native";
import { Link } from "expo-router";
import Layout from "./orgnaisms/Layout/Layout";

export default function Main() {
  return (
    <Layout>
      <View>
        <Link href="/productList">Go to product list</Link>
      </View>
    </Layout>
  );
}
