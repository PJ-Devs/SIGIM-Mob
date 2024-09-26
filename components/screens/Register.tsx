import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useRef, useState } from "react";
import { DTOEnterprise, DTOEnterpriseColaborator } from "../../types/products";
import RegisterCollaboratorsForm from "../molecules/CollaboratorsRegisterForm";
import RegisterOwnerForm from "../molecules/OwnerRegisterForm";
import {
  registerEnterprise,
  registerColaborators,
  registerAdmin,
} from "../../lib/auth";
import { Pressable, Text } from "react-native";
import { useForm } from "react-hook-form";

export default function Register(): JSX.Element {
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

  const [colaborator, setColaborators] = useState<DTOEnterpriseColaborator[]>(
    []
  );

  return (
    <Layout includeHeader={false}>
      <RegisterEnterpriseForm control={control} />
      {/* <RegisterCollaboratorsForm setColaborators={setColaborators} />
      <RegisterOwnerForm setAdmin={setAdmin} /> */}
      <Pressable onPress={handleSubmit(handleRegisterAll)}>
        <Text>Finalizar registro</Text>
      </Pressable>
    </Layout>
  );
}
