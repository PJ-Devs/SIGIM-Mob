import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Layout from "../orgnisms/Layout";
import { Text, View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { router } from "expo-router";
import PasswordResetOTPForm from "./VerifyOTP";

export default function ResetPassword() {
  const { authState } = useAuth();
  const { control } = useForm();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authState);
  }, [authState]);

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
          style="absolute left-10 top-16 p-2.5 rounded-full border-[1px] border-solid border-dark z-1 shadow-md"
        />
      )}
      {!isAuthenticated ? (
        <PasswordResetOTPForm />
      ) : (
        <View>
          <Text>Seleccione una nueva contrasena</Text>
          <CustomInput
            propertyName="password"
            control={control}
            placeholder="Contrasena"
          />
          <CustomInput
            propertyName="confirm-password"
            control={control}
            placeholder="Confirmar contrasena"
          />
        </View>
      )}
    </Layout>
  );
}
