import SingleProduct from "../../../../components/screens/SingleProduct";
import AuthorizationMiddleware from "../../../../middlewares/AuthorizationMiddleware";

export default function singleProduct(): JSX.Element {
  return (
    <AuthorizationMiddleware
      authorizedRoles={[
        "Dueño de Empresa",
        "Co-Administrador",
        "Administrador de Inventario",
      ]}
    >
      <SingleProduct />
    </AuthorizationMiddleware>
  );
}
