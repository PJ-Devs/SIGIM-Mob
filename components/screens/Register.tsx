import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useState } from "react";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import { Pressable, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";
import Toast from 'react-native-toast-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from "../../lib/schemas/auth";
import { getEnterprise, getProfile } from "../../lib/api/api.fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as z from 'zod';

export default function Register(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);
  const { onRegister } = useAuth();

  type FormFields = z.infer<typeof RegisterSchema>;

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });
  
  const fetchEnterpriseInfo = async () => {
    try {
      const enterpriseData = await getEnterprise();
      await AsyncStorage.setItem("enterprise", JSON.stringify(enterpriseData));
      console.log("Enterprise", enterpriseData);
    } catch (error) {
      console.error("Failed to fetch enterprise name:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      await AsyncStorage.setItem("profile", JSON.stringify(profileData));
      console.log("Profile", profileData);
    } catch (error) {
      console.log("Error fetching user profile", error);
    }
  };


  const handleRegisterAll = async (data: any) => {
    const result = await onRegister!(data);

    if (result?.err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: '¡Bienvenido!',
      });
      await fetchEnterpriseInfo();
      await fetchProfile();
      router.push("/");
    }
  };

  const goToNextStep = async () => {
    const isValid = await trigger(['enterprise_NIT', 'enterprise_email', 'enterprise_name', 'phone_number']); 
  
    if (isValid) {
      setCurrentStep((prev) => prev + 1); 
    } 
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); 
  };
  
  return (
    <Layout includeHeader={false} canGoBack={currentStep === 1}>
      <View className="px-5">
      {currentStep === 1 && (
        <RegisterEnterpriseForm 
          control={control}
          trigger={trigger}
          onRegister={goToNextStep}
          errors={errors}
        />
      )}

      {currentStep === 2 && (
        <RegisterOwnerForm 
          trigger={trigger}
          control={control} 
          onRegister={handleSubmit(handleRegisterAll)}  
          onBack={goToPreviousStep} 
          errors={errors}  
        />
      )}
      
      {currentStep === 3 && (
        <Pressable onPress={handleSubmit(handleRegisterAll)}>
          <Text>Finalizar registro</Text>
        </Pressable>
      )}

      <Toast />
      </View>
    </Layout>
  );
}
