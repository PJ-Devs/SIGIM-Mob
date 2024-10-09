import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import Layout from "../orgnisms/Layout";

export default function EmailSelection() {
  const { control, trigger } = useForm();
  const [loading, setLoading] = useState(false);

  const handleSendAuthCode = async () => {
    router.push("/password-reset/verify-otp");
  };

  return (
    <Layout includeHeader={false}>
      <View className="h-screen justify-center">
        <View className="relative bottom-[10%] gap-8">
          <View style={{ gap: 10 }}>
            <Text className="text-xl font-semibold">
              Ingrese su direccion de correo
            </Text>
            <CustomInput
              control={control}
              placeholder="Correo Electronico"
              propertyName="email"
              trigger={trigger}
              rules={{
                required: "Este campo es requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingresa un correo electrónico válido",
                },
              }}
            />
          </View>
          <View style={{ gap: 10 }}>
            <CustomButton
              type="primary"
              title="Enviar codigo"
              icon="paper-plane"
              iconSize={20}
              loading={loading}
              onPress={() => handleSendAuthCode()}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
}
