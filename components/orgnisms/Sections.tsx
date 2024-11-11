import React from "react";
import { View, Dimensions } from "react-native";
import SectionCard from "../molecules/SectionCard";
import { ScrollView } from "react-native";
import Layout from "./Layout";

export default function Sections() {
  return (
    <Layout canGoBack={false}>
      <ScrollView>
        <View className="justify-center items-center py-4" style={{
          gap: 15,
        }}>
          <SectionCard link="/profile" linkText="Perfil" />
          <SectionCard link="/productList" linkText="Inventario" />
          <SectionCard link="/sell" linkText="Crear una venta"/>
          {/* <SectionCard link="/login" linkText="Acceder" />
          <SectionCard link="/signUp" linkText="Registrarse" /> */}
        </View>
      </ScrollView>
    </Layout>
  );
}
