import { View } from "react-native";
import { Link } from "expo-router";
import Layout from "../orgnisms/Layout";
import DropDown from "../atoms/DropDown";

export default function Main() {
  return (
    <Layout>
      <View>
        <Link href="/productList">Go to product list</Link>
        <DropDown />
      </View>
    </Layout>
  );
}
