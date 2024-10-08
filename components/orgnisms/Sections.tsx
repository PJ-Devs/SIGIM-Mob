import React from "react";
import { View, Dimensions } from "react-native";
import SectionCard from "../molecules/SectionCard";
import { ScrollView } from "react-native";
import Layout from "./Layout";

export default function Sections() {
  return (
    <Layout>
    <ScrollView>
      <View className="h-screen flex mb-14 mt-8 justify-center items-center" style={{gap:0}}>
        <View className="flex-1">
          <SectionCard link="/productList" linkText="Inventario" />
        </View>
        <View className="flex-1">
          <SectionCard link="/profile" linkText="Perfil" />
        </View>
        <View className="flex-1">
          <SectionCard link="/login" linkText="Acceder" />
        </View>
        <View className="flex-1">
          <SectionCard link="/signUp" linkText="Registrarse" />
        </View>
      </View>
    </ScrollView>
    </Layout>
  );
}
