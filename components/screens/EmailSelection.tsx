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
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function EmailSelection() {

  const schema = z.object({
    email: z.string({ message: "El correo es obligatorio." })
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
              errors={errors}
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
