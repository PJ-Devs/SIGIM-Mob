import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useRef, useState } from "react";
import { DTOEnterprise, DTOEnterpriseColaborator, RegisterEnterpriseFormat } from "../../types/products";
import RegisterCollaboratorsForm from "../molecules/CollaboratorsRegisterForm";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import { registerEnterprise } from "../../lib/auth";
import { Pressable, Text } from "react-native";
import { useForm } from "react-hook-form";

export default function Register(): JSX.Element {
          const [colaborator, setColaborators] = useState<DTOEnterpriseColaborator[]>([]);
  
  const [currentStep, setCurrentStep] = useState(1);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const handleRegisterAll = async (data: any) => {
    try {
      const enterpriseResponse = await registerEnterprise(enterprise.current);
      const collaboratorsResponse = await registerColaborators(colaborator);
      const adminResponse = await registerAdmin(admin);
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
        />
      )}

      {currentStep === 2 && (
        <RegisterOwnerForm 
          setAdmin={setAdmin} 
          onRegister={handleRegisterAll}  
          onBack={goToPreviousStep} 
        />
      )}
      
        <Pressable onPress={handleSubmit(handleRegisterAll)}>
        <Text>Finalizar registro</Text>
      </Pressable>
    </Layout>
  );
}
