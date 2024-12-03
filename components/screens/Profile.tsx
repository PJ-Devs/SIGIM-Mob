import { Text, View, Modal } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import Layout from "../orgnisms/Layout";
import CircularLogo from "../atoms/CircularLogo";
import CustomButton from "../atoms/CustomButton";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../types/products";
import AccountMenu from "../molecules/AccountMenu";
import { useIsFocused } from "@react-navigation/native";
import { deleteEnterprise } from "../../lib/api/api.fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerifyModal from "../molecules/VerifyModal";
import { deleteSecuredItem } from "../../utils/secureStore";
import { showNotification } from "../../lib/toast/toastify";
import Loading from "../molecules/Loading";
import BackButton from "../atoms/BackButton";

export default function Profile(): JSX.Element {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalState, setmodalState] = useState({
    deleteEnterprise: false,
    logOut: false,
  });

  const isFocused = useIsFocused();
  const { onLogout } = useAuth();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await AsyncStorage.getItem("profile");
      if (profileData !== null) {
        const profile = JSON.parse(profileData);
        setUserProfile(profile);
        setLoading(false);
        return;
      }
    } catch (error) {
      setUserProfile(null);
      console.error("Failed to retrieve enterprise data:", error);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await onLogout()
        .then(async () => {
          await deleteSecuredItem("ACCESS_TOKEN");
          showNotification(
            "info",
            `Nos vemos luego, ${userProfile?.name.split(" ")[0]}!`
          );
          AsyncStorage.removeItem("profile");
          AsyncStorage.removeItem("enterprise");
          setLoading(false);
          router.push("/login");
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("Error al cerrar sesión", error);
      showNotification("error", "No se pudo cerrar sesión");
    }
  };

  const enterpriseDeleting = async () => {
    try {
      setLoading(true);
      await deleteEnterprise()
        .then(async (response) => {
          if (response) {
            await deleteSecuredItem("ACCESS_TOKEN");
            showNotification("success", "Empresa eliminada con éxito");
            router.push("/login");
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("Error al eliminar empresa", error);
      showNotification("error", "No se pudo eliminar la empresa");
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchProfile();
    }
  }, [isFocused]);

  return (
    <Layout leftButton={<BackButton />}>
      {loading && !userProfile ? (
        <Loading />
      ) : (
        <View className="w-full h-[93%] justify-between">
          <View style={{ gap: 30 }}>
            <View className="w-full rounded-lg" style={{ gap: 20 }}>
              <Text className="text-xl font-semibold">Hola denuevo</Text>
              <View
                className="flex-row justify-center items-center"
                style={{ gap: 15 }}
              >
                <CircularLogo
                  img={require("../../assets/atom.png")}
                  alt="profile_img"
                />
                <View>
                  <Text className="text-2xl font-bold text-blue-600">
                    {userProfile?.name || "Cargando..."}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-center items-center px-2 py-4 bg-dark rounded-md shadow-sm">
                <Text className="text-white font-normal">
                  Haces parte de la empresa{" "}
                </Text>
                <Text className="text-white font-semibold">
                  como {userProfile?.role.name || "Cargando..."}
                </Text>
              </View>
            </View>
            <AccountMenu user={userProfile!} />
          </View>

          <View style={{ gap: 10 }}>
            <CustomButton
              title="Cerrar Sesión"
              type="error"
              icon="door-closed"
              iconSize={20}
              iconColor="white"
              disabled={loading}
              loading={loading && modalState.logOut}
              onPress={() => setmodalState({ ...modalState, logOut: true })}
            />
            {userProfile?.role.id === 5 && (
              <CustomButton
                title="Eliminar Empresa"
                type="error"
                icon="exclamation-triangle"
                iconSize={20}
                iconColor="white"
                disabled={loading}
                loading={loading && modalState.deleteEnterprise}
                onPress={() =>
                  setmodalState({ ...modalState, deleteEnterprise: true })
                }
              />
            )}
          </View>
          <VerifyModal
            title="Cerrar Sesión"
            message="¿Estás completamente seguro de cerrar sesión?"
            action={() => handleLogout()}
            modalVisible={modalState.logOut}
            setVisible={(value) =>
              setmodalState({ ...modalState, logOut: value })
            }
          />
          <VerifyModal
            title="Eliminar Empresa"
            message="¿Estás completamente seguro de eliminar tu empresa?"
            action={() => enterpriseDeleting()}
            modalVisible={modalState.deleteEnterprise}
            setVisible={(value) =>
              setmodalState({ ...modalState, deleteEnterprise: value })
            }
          />
        </View>
      )}
    </Layout>
  );
}
