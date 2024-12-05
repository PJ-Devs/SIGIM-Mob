import React from "react";
import { View, Dimensions } from "react-native";
import { ScrollView } from "react-native";
import Layout from "./Layout";
import SectionCard from "../molecules/SectionCard";
import FloatingMenu from "../molecules/FloatingMenu";

export default function Sections() {
  return (
    <Layout canGoBack={false}>
      <ScrollView>
        <View className="justify-center items-center py-4" style={{
          gap: 15,
        }}>
          <SectionCard link="/productList" linkText="Inventario" />
        </View>
      </ScrollView>
      <FloatingMenu />
    </Layout>
  );
}
