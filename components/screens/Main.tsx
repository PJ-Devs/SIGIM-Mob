import { View } from "react-native";
import { Link } from "expo-router";
import Layout from "../orgnisms/Layout";
import Sections from "../orgnisms/Sections";

export default function Main() {

  return (
    <Layout>
      <View>
        <Sections />
      </View>
    </Layout>
  );
}
