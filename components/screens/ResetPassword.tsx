import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Layout from "../orgnisms/Layout";
import { Text, View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { router } from "expo-router";

export default function ResetPassword() {
  const { authState } = useAuth();
  const { control } = useForm();

  const handlePasswordReset = async () => {

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
            propertyName="confirm-password"
            control={control}
            secureTextEntry={true}
            placeholder="Confirmar contraseña"
          />
        </View>
        <CustomButton
          type="primary"
          title="Cambiar contraseña"
          icon="key"
          iconSize={20}
          onPress={() => {}}
        />
      </View>
    </Layout>
  );
}
