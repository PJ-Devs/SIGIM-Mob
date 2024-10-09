import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import CustomButton from "../atoms/CustomButton";
import { useState } from "react";
import Layout from "../orgnisms/Layout";
import { router } from "expo-router";

export default function VerifyOTP(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleSendAuthCode = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleResendAuthCode = async () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
    }, 3000);
  };

  return (
    <Layout includeHeader={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className="flex-1 p-8 justify-center items-center"
            style={{ gap: 12 }}
          >
            <Image
              source={require("../../assets/images/validation.jpg")}
              resizeMode="contain"
              className="w-full h-2/5"
            />
            <View className="gap-1">
              <Text className="text-lg font-semibold text-center">
                Ingresa tu código de verificación
              </Text>
              <Text className="text-gray-500 text-center">
                Hemos enviado un código de verificación a tu correo, por favor
                ingrésalo a continuación:
              </Text>
            </View>
            <View className="py-6">
              <OtpInput
                numberOfDigits={6}
                focusColor={"black"}
                autoFocus={false}
                onTextChange={(otp) => {
                  setOtpCode(otp);
                }}
              />
            </View>
            <View className="w-full flex-shrink-0" style={{ gap: 10 }}>
              <CustomButton
                type="primary"
                title="Verificar"
                icon="check"
                iconSize={20}
                loading={loading}
                disabled={otpCode.length < 6 || isResending}
                onPress={() => handleSendAuthCode()}
              />
              <CustomButton
                type="secondary"
                title="Reenviar codigo"
                icon="redo"
                iconSize={20}
                loading={isResending}
                disabled={isResending || loading}
                onPress={() => handleResendAuthCode()}
              />
            </View>
            <Pressable onPress={() => router.back()}>
              <Text className="font-semibold">
                ¿Te equviocaste de correo?{" "}
                <Text className="text-blue-500">Cambiar</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}
