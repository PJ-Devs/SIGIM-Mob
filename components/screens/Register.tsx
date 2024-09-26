import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useRef, useState } from "react";
import { DTOEnterprise, DTOEnterpriseColaborator } from "../../types/products";
import RegisterCollaboratorsForm from "../molecules/CollaboratorsRegisterForm";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import { registerEnterprise, registerColaborators, registerAdmin } from "../../lib/auth";
import { Pressable, Text } from "react-native";

export default function Register(): JSX.Element {
  const enterprise = useRef<DTOEnterprise>({
    name: '',
    NIT: '',
    email: '',
    phoneNumber: '',
    currency: 'COP',
  });

  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegisterAll = async () => {
    try {
      const enterpriseResponse = await registerEnterprise(enterprise.current);
      const collaboratorsResponse = await registerColaborators(colaborator);
      const adminResponse = await registerAdmin(admin);

    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  
  const [colaborator, setColaborators] = useState<DTOEnterpriseColaborator[]>([]);
  
  return (
    <Layout includeHeader={false}>
      <RegisterEnterpriseForm enterprise={enterprise} />
      <RegisterCollaboratorsForm setColaborators={setColaborators} />
      <RegisterOwnerForm setAdmin={setAdmin} />
      <Pressable onPress={handleRegisterAll}>
        <Text>Finalizar registro</Text>
      </Pressable>
    </Layout>
  );
}
