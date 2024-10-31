import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import Layout from "../orgnisms/Layout";
import { textStyles } from "../../tokens";
import { requestPasswordResetOTP } from "../../lib/api/api.auth";
import { setItem } from "../../utils/secureStore";
import Toast from "react-native-toast-message";

export default function EmailSelection() {
  const { control, trigger, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const handleSendAuthCode = async (data: any) => {
    try {
      setLoading(true);
      const response = await requestPasswordResetOTP(data);
      if (response) {
        Toast.show({
          type: "success",
          text1: "Código de verificación enviado",
          visibilityTime: 3000,
          swipeable: true,
          text1Style: { fontSize: 16 },
          text2Style: { fontSize: 14 },
          topOffset: 60,
        });
        setItem("email", data.email);
        router.push("/password-reset/verify-otp");
      }
    } catch (error) {
      console.log("Error enviando código de verificación", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout includeHeader={false}>
      <View className="h-screen justify-center relative bottom-[10%]">
        <View className="gap-1">
          <Text className={`${textStyles.h2} text-center`}>
            Ingrese su direccion de correo
          </Text>
          <Text className={`${textStyles.commonText} text-center`}>
            Ingresa el correo electrónico asociado a tu cuenta para enviar el
            código de verificación.
          </Text>
        </View>
        <View>
          <View className="py-6">
            <CustomInput
              control={control}
              placeholder="Correo Electronico"
              propertyName="email"
              trigger={trigger}
            />
          </View>
          <CustomButton
            type="primary"
            title="Enviar codigo"
            icon="paper-plane"
            iconSize={20}
            loading={loading}
            onPress={handleSubmit(handleSendAuthCode)}  
          />
        </View>
      </View>
    </Layout>
  );
}
