import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface RegisterEnterpriseFormProps {
  control: any;
  trigger: any;
  onRegister: () => Promise<void>;
  errors: any;
}

export default function RegisterEnterpriseForm({
  control,
  onRegister,
  trigger,
  errors
}: RegisterEnterpriseFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    onRegister();
    setLoading(false);
  };

  return (
    <View className="h-screen">
      <View className="flex-1 justify-center w-full h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View className="items-center mb-10">
              <Image
                className="w-[150px] h-[150px] bg-primary rounded-full"
                alt="logo"
              />
            </View>
            <Text className="w-full text-xl font-semibold">
              Registrar tu empresa
            </Text>
            <View className="py-5" style={{ gap: 15 }}>
              <CustomInput
                propertyName="enterprise_name"
                placeholder="Nombre de empresa"
                trigger={trigger}
                control={control}
                errors={errors}
              />
              <CustomInput
                propertyName="enterprise_NIT"
                placeholder="NIT"
                trigger={trigger}
                control={control}
                errors={errors}
                
              />
              <CustomInput
                propertyName="phone_number"
                placeholder="Numero de contacto"
                trigger={trigger}
                control={control}
                errors={errors}
              />
              <CustomInput
                propertyName="enterprise_email"
                placeholder="E-mail"
                trigger={trigger}
                control={control}
                errors={errors}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <CustomButton
          type="primary"
          title="Registrar Empresa"
          loading={loading}
          onPress={handleRegister}
        />
        <Pressable onPress={() => router.navigate("/login")}>
          <Text className={`${anchorContainer} text-center`}>
            Ya tienes una cuenta?{" "}
            <Text className="text-blue-500">Inicia sesión</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const anchorContainer = "text-black text-right mt-2 opacity-75";
