import { View } from "react-native";
import { Link } from "expo-router";
import Layout from "../orgnisms/Layout";
import InputFile from "../molecules/InputFile";

export default function Main() {
  return (
    <Layout>
      <View>
        <Link href="/productList">Go to product list</Link>
        <InputFile />
      </View>
    </Layout>
  );
}
