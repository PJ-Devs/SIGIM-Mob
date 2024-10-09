import { Text, View, Modal } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import Layout from "../orgnisms/Layout";
import CircularLogo from "../atoms/CircularLogo";
import CustomButton from "../atoms/CustomButton";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../types/products";
import AccountMenu from "../molecules/AccountMenu";
import { useIsFocused } from '@react-navigation/native';
import {  getProfile } from "../../lib/api/api.fetch";
import Toast from 'react-native-toast-message';

export default function Profile(): JSX.Element {
  const { onLogout } = useAuth();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<User>({
    id: 0,
    email: "",
    name: "",
    role: {
      id: 0,
      name: "",
    },
  });

  useEffect(() => {
   
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        console.log("Profile data", profileData);
        setUserProfile(profileData);
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };
    if (isFocused) {
    fetchProfile();}
  }, [isFocused]);

  const handleLogout = async (data: any) => {
    try {
      await onLogout().then(() =>{
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
          <Text className="font-bold text-xl text-blue-400">
            {userProfile?.name || "Cargando..."}
          </Text>
          <Text className="">{userProfile?.email || "Cargando..."} </Text>
          <Text className="">{userProfile?.role.name || "Cargando..."} </Text>
        </View>
      </View>

     <AccountMenu/>

      <View className="flex-col justify-center" style={{ gap: 10 }}>
        <CustomButton
          type="error"
          icon="exclamation-triangle"
          title="Eliminar Empresa"
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
      <Toast></Toast>
    </Layout>
  );
}
