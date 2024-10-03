import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useState } from "react";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import { Pressable, Text } from "react-native";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { router } from "expo-router";

export default function Register(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);
  const { onRegister } = useAuth();
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm();
  
  const handleRegisterAll = async (data:any) => {
    const result = await onRegister!(data);

    if (result.err) {
      console.log("Error en el registro", result.message);
    } else {
      router.push("/");
    }
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); 
  };

  return (
    <Layout includeHeader={false}>
      {currentStep === 1 && (
        <RegisterEnterpriseForm 
          control={control}
          trigger={trigger}
          onRegister={goToNextStep}
        />
      )}

      {currentStep === 2 && (
        <RegisterOwnerForm 
        trigger={trigger}
          control={control} 
          onRegister={handleSubmit(handleRegisterAll)}  
          onBack={goToPreviousStep} 
        />
      )}
      
        <Pressable onPress={handleSubmit(handleRegisterAll)}>
        <Text>Finalizar registro</Text>
      </Pressable>
    </Layout>
  );
}
