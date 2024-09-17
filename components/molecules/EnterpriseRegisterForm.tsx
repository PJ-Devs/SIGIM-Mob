import { Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Layout from "../orgnisms/Layout";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput/CustomInput";

export default function RegisterEnterpriseForm(): JSX.Element {
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
          iconSize={20}
          onPress={() => {
            router.back();
          }}
          style="absolute p-2.5 rounded-full top-16 left-0 border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}

      <View className="flex-1 justify-center w-full h-full">
        <View className="items-center mb-10">
          <Image
            className="w-[150px] h-[150px] bg-primary rounded-full"
            alt="logo"
          />
        </View>
        <Text className="w-full text-xl font-semibold">
          Regitrar tu empresa
        </Text>
        <View className="py-5" style={{ gap: 15 }}>
          <CustomInput
            placeholder="Nombre de empresa"
            type="email-address"
            width={300}
          />
          <CustomInput placeholder="NIT" type="email-address" width={300} />
          <CustomInput
            placeholder="Numero de contacto"
            type="email-address"
            width={300}
          />
          <CustomInput placeholder="E-mail" type="email-address" width={300} />
          <CustomInput placeholder="Password" width={300} />
        </View>
        <CustomButton
          type="primary"
          title="Registrar Empresa"
          loading={loading}
          onPress={handleLogin}
        />
        <Pressable onPress={() => router.navigate("/login")}>
          <Text className={`${anchorContainer} text-center`}>
            Ya tienes una cuenta?{" "}
            <Text className="text-blue-500">Inicia sesion</Text>
          </Text>
        </Pressable>
      </View>
    </Layout>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
