import { Text, View } from "react-native";
import Layout from "../orgnisms/Layout";

export default function CreateProduct(): JSX.Element {
  return (
    <Layout canGoBack={false}>
      <View className="items-center w-full" style={{ gap: 20 }}>
        <View className="w-full">
          <Text className="text-lg text-left font-semibold border-b-2 border-dark">
            Información del producto
          </Text>
        </View>
        <View></View>
      </View>
    </Layout>
  );
}
