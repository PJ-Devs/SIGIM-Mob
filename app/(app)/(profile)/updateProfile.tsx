import BackButton from "../../../components/atoms/BackButton";
import UpdateProfileForm from "../../../components/molecules/UpdateProfileForm";
import Layout from "../../../components/orgnisms/Layout";
import AuthorizationMiddleware from "../../../middlewares/AuthorizationMiddleware";

export default function () {
  return (
    <Layout leftButton={<BackButton />}>
      <AuthorizationMiddleware
        authorizedRoles={[
          "Dueño de Empresa",
          "Co-Administrador",
          "Administrador de Inventario",
          "Gestor de Ventas",
          "Empleado Base",
        ]}
      >
        <UpdateProfileForm />
      </AuthorizationMiddleware>
    </Layout>
  );
}
