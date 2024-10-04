import { View } from "react-native";
import Layout from "../orgnisms/Layout";
import Sections from "../orgnisms/Sections";

export default function Home() {
  console.log("Home");
  return (
    <Layout>
      <View>
        <Sections />
      </View>
    </Layout>
  );
}
