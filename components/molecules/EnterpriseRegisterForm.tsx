import { Image, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import { RegisterEnterpriseFormat } from "../../types/products";

interface RegisterEnterpriseFormProps {
  onRegister: () => void;
  setEnterprise: React.Dispatch<React.SetStateAction<RegisterEnterpriseFormat>>;
}

export default function RegisterEnterpriseForm({
  onRegister, setEnterprise
}: RegisterEnterpriseFormProps): JSX.Element {


  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister();
    }, 2000);
  };


  
  const updateEnterpriseField = (field: keyof RegisterEnterpriseFormat, value: string) => {
    setEnterprise((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View>
      {router.canGoBack() && (
        <CustomButton
          type="icon"
          icon="arrow-left"
          iconSize={20}
          onPress={() => {
            router.back();
          }}
          style="absolute p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
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
          Registrar tu empresa
        </Text>
        <View className="py-5" style={{ gap: 15 }}>
          <CustomInput
            placeholder="Nombre de empresa"
            onChangeText={(text) => updateEnterpriseField("enterprise_name", text)}
            width={300}
          />
          <CustomInput
            placeholder="NIT"
            onChangeText={(text) => updateEnterpriseField("enterprise_NIT", text)}
            width={300}
          />
          <CustomInput
            placeholder="Numero de contacto"
            onChangeText={(text) => updateEnterpriseField("phone_number", text)}
            width={300}
          />
          <CustomInput
            placeholder="E-mail"
            type="email-address"
            onChangeText={(text) => updateEnterpriseField("enterprise_email", text)}
            width={300}
          />
        </View>
        <CustomButton
          type="primary"
          title="Registrar Empresa"
          loading={loading}
          onPress={handleRegister}
        />
        <Pressable onPress={() => router.navigate("/login")}>
          <Text className={`${anchorContainer} text-center`}>
            Ya tienes una cuenta?{" "}
            <Text className="text-blue-500">Inicia sesión</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
