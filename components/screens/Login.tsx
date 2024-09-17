import { Image, Pressable, Text, View } from "react-native";
import Layout from "../orgnisms/Layout";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";

export default function Login(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout includeHeader={false}>
      {router.canGoBack() && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          onPress={() => {
            router.back();
          }}
          style="absolute p-2.5 rounded-full top-8 left-0 border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}

      <View className="flex-1 justify-center w-full h-full">
        <View className="items-center mb-10">
          <Image className="w-[150px] h-[150px] bg-primary rounded-full" />
        </View>
        <Text className="w-full text-xl font-semibold">Iniciar sesión</Text>
        <View className="py-5" style={{ gap: 15 }}>
          <CustomInput placeholder="E-mail" type="email-address" width={300} />
          <CustomInput placeholder="Password" width={300} />
        </View>
        <CustomButton
          type="primary"
          title="Ingresa"
          loading={loading}
          onPress={handleLogin}
        />
        <Pressable>
          <Text className={anchorContainer}>
            Olvidaste tu contraseña?{" "}
            <Text className="text-blue-500">Recuperar</Text>
          </Text>
        </Pressable>
        <View className="border-b-[1px] bg-gray-300 mt-10 mb-4 opacity-50" />
        <CustomButton
          type="secondary"
          title="Acceder como empleado"
          onPress={() => {}}
        />
        <Pressable onPress={() => router.navigate("/signUp")}>
          <Text className={anchorContainer}>
            No tienes una cuenta?{" "}
            <Text className="text-blue-500">Crea una</Text>
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
}

const anchorContainer = "text-black text-center mt-2 opacity-75";
