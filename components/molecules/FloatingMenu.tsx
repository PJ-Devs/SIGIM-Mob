import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function FloatingMenu(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      {showMenu && (
        <View className="mb-4 p-4 w-60" style={styles.menu}>
          <TouchableOpacity className="rounded-full py-2 px-6 
           items-center bg-[#39CDCD] flex-row" style={{ gap: 15 }} onPress={() => { router.push("/sell") }}>
            <MaterialIcons name="sell" size={24} color="#fff" />
            <Text className="text-[#fff] text-base ">Vender</Text>
          </TouchableOpacity>

          <TouchableOpacity className="rounded-full py-2 px-6 
           items-center bg-[#39CDCD] flex-row" style={{ gap: 15 }} onPress={() => { router.push("/cart") }}>
            <MaterialIcons name="shopping-cart" size={24} color="#fff" />
            <Text className="text-[#fff] text-base ">Carrito de ventas</Text>
          </TouchableOpacity>

          <TouchableOpacity className="rounded-full py-2 px-6 
           items-center bg-[#39CDCD] flex-row" style={{ gap: 15 }} onPress={() => { router.push("/mySells") }}>
            <MaterialIcons name="attach-money" size={24} color="#fff" />
            <Text className="text-[#fff] text-base ">Mis Ventas</Text>
          </TouchableOpacity>

        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowMenu(!showMenu);
        }}
      >
        <Text style={styles.text}>{showMenu ? "-" : "+"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  menu: {
    position: "absolute",
    bottom: 60,
    right: 0,
    gap: 10,
  },
  button: {
    backgroundColor: "#39CDCD",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "#fff",
  },
});
