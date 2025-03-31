import CreateProduct from "../../../components/screens/CreateProduct";
import AuthorizationMiddleware from "../../../middlewares/AuthorizationMiddleware";

export default function createProductFrom(): JSX.Element {
  return (
    <AuthorizationMiddleware
      authorizedRoles={[
        "Dueño de Empresa",
        "Co-Administrador",
        "Administrador de Inventario",
      ]}
    >
      <CreateProduct />
    </AuthorizationMiddleware>
  );
}
