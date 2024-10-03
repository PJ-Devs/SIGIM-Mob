import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";

interface RegisterEnterpriseFormProps {
  control: any;
  onRegister: () => void;
}

export default function RegisterEnterpriseForm({
  control,
  onRegister,
}: RegisterEnterpriseFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister();
    }, 2000);
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
        <ScrollView>
          <View className="py-5" style={{ gap: 15 }}>
            <CustomInput
              propertyName="enterprise_name"
              placeholder="Nombre de empresa"
              control={control}
              rules={{
                required: "Este campo es requerido",
              }}
            />
            <CustomInput
              propertyName="enterprise_NIT"
              placeholder="NIT"
              control={control}
              rules={{
                required: "Este campo es requerido",
              }}
            />
            <CustomInput
              propertyName="phone_number"
              placeholder="Numero de contacto"
              control={control}
              rules={{
                required: "Este campo es requerido",
              }}
            />
            <CustomInput
              propertyName="enterprise_email"
              placeholder="E-mail"
              control={control}
              rules={{
                required: "Este campo es requerido",
              }}
            />
          </View>
        </ScrollView>
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
