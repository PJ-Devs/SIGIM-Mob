import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Layout from "../orgnisms/Layout";
import { Text, View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { router } from "expo-router";
import { getItem, getSecuredItem } from "../../utils/secureStore";
import { restorePassword } from "../../lib/api/api.auth";
import { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { useState } from "react";

export default function ResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm();

  const handlePasswordReset = async (data: any) => {
    try {
      setLoading(true);
      const { password, confirm_password } = data;
      if (password !== confirm_password) {
        console.log("Las contraseñas no coinciden");
        return;
      }

      const requestBody = {
        email: getItem("email") as string,
        password,
      }

      const resetPasswordToken = await getSecuredItem("PASSWORD_RESET_TOKEN");
      console.log(resetPasswordToken);
      await restorePassword(requestBody, resetPasswordToken as string)
        .then((response) => {
          if (response) {
            Toast.show({
              type: "success",
              text1: "Contraseña cambiada",
              text2: "Su contraseña ha sido cambiada exitosamente",
              visibilityTime: 3000,
              swipeable: true,
              text1Style: { fontSize: 16 },
              text2Style: { fontSize: 14 },
              topOffset: 60,
            });
            router.push("/login");
          }
        });
    } catch (error) {
      console.log("Error al cambiar contraseña", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout includeHeader={false}>
      <View className="flex-1 w-full h-full justify-center" style={{ gap: 15 }}>
        <View>
          <Text className="text-lg font-semibold text-center">
            Seleccione una nueva contraseña
          </Text>
          <Text className="text-gray-600 text-center">
            Al restablecer su contraseña, su cuenta estará protegida. No
            comparta esta con nadie para mantener la seguridad de su
            cuenta.
          </Text>
        </View>
        <View className="py-4" style={{ gap: 10 }}>
          <CustomInput
            propertyName="password"
            control={control}
            secureTextEntry={true}
            placeholder="Contraseña"
          />
          <CustomInput
            propertyName="confirm_password"
            control={control}
            secureTextEntry={true}
            placeholder="Confirmar contraseña"
          />
        </View>
        <CustomButton
          loading={loading}
          type="primary"
          title="Cambiar contraseña"
          icon="key"
          iconSize={20}
          onPress={handleSubmit(handlePasswordReset)}
        />
      </View>
    </Layout>
  );
}
