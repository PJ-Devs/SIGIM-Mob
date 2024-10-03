import { Text, View, Modal } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Layout from "../orgnisms/Layout";
import CircularLogo from "../atoms/CircularLogo";
import CustomButton from "../atoms/CustomButton";
import { logout } from "../../lib/auth";

export default function Profile(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async (data: any) => {
    try {
      let formattedData = {
        ...data,
        device_name: "valen",
      };
      await logout(formattedData).then(() => {
        router.push("/login");
      });
    } catch (error) {
      console.log("Error al cerrar sesión");
      console.log(error);
    }
  };

  return (
    <Layout>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="bg-slate-100 p-4" style={{ flex: 1 }}>
          <View
            className="justify-center items-center"
            style={{ flex: 1, zIndex: 999 }}
          >
            <View
              className="bg-white p-10 border border-white rounded-xl items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text className="text-center mb-4 text-base">
                ¿Estás completamente seguro de eliminar tu empresa?
              </Text>
              <View className="flex-row mt-6" style={{ gap: 10 }}>
                <CustomButton
                  type="error"
                  icon="exclamation-triangle"
                  title="Si, eliminar"
                  onPress={() => {
                    /* Toda la lógica de eliminar la empresa
                    cuando Manuel tenga lista la función
                    */
                    setModalVisible(false);
                    router.push("/login");
                  }}
                />
                <CustomButton
                  type="success"
                  icon="door-closed"
                  title="No eliminar"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View className="flex-row p-2 gap-x-6 justify-center">
        <CircularLogo
          img={require("../../assets/atom.png")}
          alt="profile_img"
        />
        <View className="flex-col justify-center gap-y-0">
          <Text className="font-bold text-xl text-blue-400">Jimmy Giraldo</Text>
          <Text className="">Encargado de caja</Text>
        </View>
      </View>

      <View className="flex-col mt-8" style={{ gap: 15 }}>
        {/* <CustomInput placeholder='Name' value='Jimmy' />
                <CustomInput placeholder='Lastname' value='Giraldo' />
                <CustomInput placeholder='E-mail' value='Jimmy@gmail.com' /> */}
        <Text className="text-base ml-2">Code: 170231</Text>
      </View>

      <View className="flex-col justify-center mt-60" style={{ gap: 10 }}>
        <CustomButton
          type="error"
          icon="exclamation-triangle"
          title="ELIMINAR MI EMPRESA"
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <CustomButton
          type="error"
          icon="door-closed"
          title="Cerrar Sesión"
          onPress={handleLogout}
        />
      </View>
    </Layout>
  );
}
