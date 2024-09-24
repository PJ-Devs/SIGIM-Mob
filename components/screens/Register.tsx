import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";
import { useRef, useState } from "react";
import { DTOEnterprise, DTOEnterpriseColaborator } from "../../types/products";

export default function Register(): JSX.Element {
  const enterprise = useRef<DTOEnterprise>({
    name: '',
    NIT: '',  
    email: '',
    phoneNumber: '',
    currency: 'COP',
  })
  const [colaborator, setColaborators] = useState<DTOEnterpriseColaborator[]>([]);

  return (
    <Layout includeHeader={false}>
      <RegisterEnterpriseForm/>
    </Layout>
  );
}
