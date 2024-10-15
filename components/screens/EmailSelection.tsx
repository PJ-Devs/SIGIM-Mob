import { useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import Layout from "../orgnisms/Layout";
import { textStyles } from "../../tokens";
import { requestPasswordResetOTP } from "../../lib/api/api.auth";
import { setItem } from "../../utils/secureStore";

export default function EmailSelection() {
  const { control, trigger, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const handleSendAuthCode = async (data: any) => {
    try {
      setLoading(true);
      const response = await requestPasswordResetOTP(data);
      if (response) {
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center">
            <Image
              source={require("../../assets/images/email_sent.jpg")}
              resizeMode="contain"
              className="w-full h-2/5"
            />
            <View className="gap-1">
              <Text className={`${textStyles.h2} text-center`}>
                Ingrese su direccion de correo
              </Text>
              <Text className={`${textStyles.commonText} text-center`}>
                Ingresa el correo electrónico asociado a tu cuenta para enviar
                el código de verificación.
              </Text>
            </View>
            <View className="py-6">
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
            <CustomButton
              type="primary"
              title="Enviar código"
              icon="paper-plane"
              iconSize={20}
              loading={loading}
              onPress={handleSubmit(handleSendAuthCode)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
