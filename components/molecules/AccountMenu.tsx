import React from "react";
import { Text, View, SafeAreaView, SectionList, Pressable } from "react-native";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import { User } from "../../types/products";
import { useNotification } from "../../contexts/NotificationContext";

interface AccountMenuProps {
  user: User;
}

export default function AccountMenu({ user }: AccountMenuProps): JSX.Element {


const { 
  expoPushToken,
  notification,
  sendPushNotification
 } = useNotification();

const DATA = [
  {
    title: "Mi cuenta",
    data: [
      {
        id: 1,
        name: "Actualizar mi información",
        icon_name: "edit",
        available: true,
        function : () => {
          router.navigate("/updateProfile");
        }
      },
      {
        id: 2,
        name: "Enviar notificacion",
        icon_name: "bell",
        available: false,
        function : () => {
          sendPushNotification("Hola", "Esta es una notificacion de prueba")
        }
      },
    ],
  },
];

   console.log(expoPushToken);
  return (
    <SafeAreaView>
      <SectionList
        sections={DATA}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={() => (
          <View className=" border-gray-200" style={{ height: 10 }} />
        )}
        renderItem={({ item }) => {
          if (user.role.id <= 3 && item.id === 1) {
            return null;
          }
        
          return (
            <Pressable
              className="flex-row items-center border-[1px] bg-white border-solid border-gray-700 px-3 py-1.5 shadow-sm rounded-md"
              style={{ gap: 8 }}
              onPress={item.function}
            >
              <Icon name={item.icon_name} color={"#1f2937"} size={24} />
              <Text className="text-lg font-medium text-gray-600">{item.name}</Text>
            </Pressable>
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <View className="flex-row items-center mb-2" style={{ gap: 10 }}>
            <Icon name="user" size={22} />
            <Text className="text-xl font-semibold">{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
