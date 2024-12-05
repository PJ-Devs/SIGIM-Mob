import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Layout from "../orgnisms/Layout";
import CustomInput from "../atoms/CustomInput";
import CustomInputPassword from "../atoms/CustomInputPassword";
import CustomButton from "../atoms/CustomButton";
import { getEnterprise, getProfile } from "../../lib/api/api.fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import Toast from "react-native-toast-message";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "../../lib/schemas/auth";

export default function Login(): JSX.Element {
  type FormFields = z.infer<typeof LoginSchema>;

  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const fetchEnterpriseInfo = async () => {
    try {
      const enterpriseData = await getEnterprise();
      await AsyncStorage.setItem("enterprise", JSON.stringify(enterpriseData));
    } catch (error) {
      console.error("Failed to fetch enterprise name:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      await AsyncStorage.setItem("profile", JSON.stringify(profileData));
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  };

  const handleLogin = async (data: any) => {
    if (!onLogin) {
      return;
    }

    setLoading(true);
    const result = await onLogin!(data);
    await fetchProfile();
    await fetchEnterpriseInfo();
    setLoading(false);

    if (!result?.err) {
      router.replace("/");
    }
  };

  return (
    <Layout includeHeader={false}>
      <View className="justify-center w-full h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View className="items-center mb-10">
              <Image
                className="w-[170px] h-[170px] bg-primary rounded-full"
                source={require("../../assets/images/logo_sigim.png")}
              />
            </View>
            <Text className="w-full text-xl font-semibold">Iniciar sesión</Text>
            <View className="py-5" style={{ gap: 15 }}>
              <CustomInput
                propertyName="email"
                placeholder="E-mail"
                type="email-address"
                control={control}
                errors={errors}
                trigger={trigger}
              />
              <View>
                <CustomInputPassword
                  propertyName="password"
                  placeholder="Password"
                  secureTextEntry={true}
                  control={control}
                  errors={errors}
                  trigger={trigger}
                />
                <Pressable onPress={() => router.push("/password-reset/email")}>
                  <Text className={anchorContainer}>
                    Olvidaste tu contraseña?{" "}
                    <Text className="text-blue-500">Recuperar</Text>
                  </Text>
                </Pressable>
              </View>
            </View>

            <CustomButton
              type="primary"
              title="Ingresa"
              loading={loading}
              onPress={handleSubmit(handleLogin)}
            />
            <Pressable
              onPress={() => {
                router.push("/signUp");
              }}
            >
              <Text className={`${anchorContainer} text-center`}>
                No tienes una cuenta?{" "}
                <Text className="text-blue-500">Crea una</Text>
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Toast />
    </Layout>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
