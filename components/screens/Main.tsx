import { View } from "react-native";
import { Link } from "expo-router";
import Layout from "../orgnisms/Layout";

export default function Main() {
  return (
    <Layout>
      <Link href="/productList">Go to product list</Link>
    </Layout>
  );
}
