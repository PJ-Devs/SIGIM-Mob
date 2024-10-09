import React from "react";
import { Text, View, SafeAreaView, SectionList, Pressable } from "react-native";
import { router } from "expo-router";

const DATA = [
  {
    title: "Mi cuenta",
    data: [
      {
        name: "Actualizar información",
        available: true,
        link: "/updateProfile",
      },
      { name: "Lenguaje", available: false, link: "/languageSettings" },
      { name: "Divisa", available: false, link: "/currencySettings" },
      {
        name: "Notificaciones",
        available: false,
        link: "/notificationSettings",
      },
    ],
  },
];

export default function AccountMenu() {
  return (
    <SafeAreaView className="flex-1">
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <View
            className={`p-5 my-2 ${
              item.available ? "bg-blue-400" : "bg-gray-300"
            }`}
          >
            <Pressable onPress={() => router.navigate(item.link)}>
              <Text className="text-lg">
                {item.name + (item.available ? "" : " (no disponible aún)")}
              </Text>
            </Pressable>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-2xl bg-white">{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}
