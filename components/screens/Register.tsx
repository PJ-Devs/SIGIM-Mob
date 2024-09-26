import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useRef, useState } from "react";
import { DTOEnterprise, DTOEnterpriseColaborator, RegisterEnterpriseFormat } from "../../types/products";
import RegisterCollaboratorsForm from "../molecules/CollaboratorsRegisterForm";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import { registerEnterprise } from "../../lib/auth";
import { Pressable, Text } from "react-native";

export default function Register(): JSX.Element {
  const [enterprise, setEnterprise] = useState<RegisterEnterpriseFormat>({
    enterprise_name: '',
    enterprise_email: '',
    enterprise_NIT: '',
    phone_number: '',
    currency: 'COP',
  });

  const [admin, setAdmin] = useState({
    owner_name: '',
    owner_email: '',
    owner_password: '',
  });

  const [colaborator, setColaborators] = useState<DTOEnterpriseColaborator[]>([]);
  
  const [currentStep, setCurrentStep] = useState(1);

  const handleRegisterAll = async () => {
    console.log(colaborator, admin, enterprise)
    const formatedRequest = {
      enterprise_name: enterprise.enterprise_name,
      enterprise_NIT: enterprise.enterprise_NIT,
      enterprise_email: enterprise.enterprise_email,
      phone_number: enterprise.phone_number,
      owner_name: admin.owner_name,
      owner_email: admin.owner_email,
      owner_password: admin.owner_password,
      colaborators: colaborator, 
      device_name: "valen", 
    };
    try {
      console.log('voy a registrar')
      const enterpriseData = await registerEnterprise(formatedRequest);
      console.log('Empresa registrada:', enterpriseData);
    } catch (error) {
      console.error('Error en el registro:', error);
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
          setEnterprise={setEnterprise} 
          onRegister={goToNextStep} 
        />
      )}

      {currentStep === 2 && (
        <RegisterOwnerForm 
          setAdmin={setAdmin} 
          onRegister={handleRegisterAll}  
          onBack={goToPreviousStep} 
        />
      )}
    </Layout>
  );
}
