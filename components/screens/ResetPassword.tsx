import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import Layout from "../orgnisms/Layout";
import { Text, View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../lib/schemas/reset_password";
import * as z from "zod";

export default function ResetPassword() {
  const { authState } = useAuth();
  

  type FormFields = z.infer<typeof resetPasswordSchema>;

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
  });

  const handlePasswordReset = async () => {};

  return (
    <Layout includeHeader={false}>
      <View className="flex-1 w-full h-full justify-center" style={{ gap: 15 }}>
        <View>
          <Text className="text-lg font-semibold text-center">
            Seleccione una nueva contraseña
          </Text>
          <Text className="text-gray-600 text-center">
            Al restablecer su contraseña, su cuenta estará protegida. No
            comparta esta con nadie para mantener la seguridad de su cuenta.
          </Text>
        </View>
        <View className="py-4" style={{ gap: 10 }}>
          <CustomInput
            propertyName="password"
            control={control}
            secureTextEntry={true}
            placeholder="Contraseña"
            errors={errors}
            trigger={trigger}
          />
          <CustomInput
            propertyName="confirm_password"
            control={control}
            secureTextEntry={true}
            placeholder="Confirmar contraseña"
            errors={errors}
            trigger={trigger}
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
