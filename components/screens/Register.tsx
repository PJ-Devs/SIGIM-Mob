import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useState } from "react";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import { registerEnterprise } from "../../lib/auth";
import { Pressable, Text } from "react-native";
import { useForm } from "react-hook-form";

export default function Register(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleRegisterAll = async (data:any) => {
    try {
      console.log(data);
      let formattedData = {
        ...data,
        device_name: "valen",
      }
      await registerEnterprise(formattedData);
    } catch (error) {
      console.error("Error en el registro:", error);
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
          onRegister={goToNextStep}
        />
      )}

      {currentStep === 2 && (
        <RegisterOwnerForm 
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
