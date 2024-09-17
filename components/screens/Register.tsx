import { View } from "react-native";
import RegisterEnterpriseForm from "../molecules/EnterpriseRegisterForm";
import Layout from "../orgnisms/Layout";

export default function Regsiter(): JSX.Element {
  return (
    <Layout includeHeader={false}>
      <RegisterEnterpriseForm/>
    </Layout>
  );
}
