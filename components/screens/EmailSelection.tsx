import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import { router } from "expo-router";
import Layout from "../orgnisms/Layout";
import { textStyles } from "../../tokens";
import { requestPasswordResetOTP } from "../../lib/api/api.auth";
import { setItem } from "../../utils/secureStore";
import Toast from "react-native-toast-message";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Image } from "react-native";

export default function EmailSelection() {
  const schema = z.object({
    email: z
      .string({ message: "El correo es obligatorio." })
      .email({ message: "El correo electrónico no es válido." })
      .min(1, { message: "El correo es obligatorio." }),
  });
  type FormFields = z.infer<typeof schema>;

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
  });
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
                errors={errors}
              />
              ;
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
