import ProductList from "../../../components/screens/ProductList"
import AuthorizationMiddleware from "../../../middlewares/AuthorizationMiddleware";

export default function productList() {
  return (
    <AuthorizationMiddleware
    authorizedRoles={[
      "Dueño de Empresa",
      "Co-Administrador",
      "Administrador de Inventario",
    ]}
  >
    <ProductList />
  </AuthorizationMiddleware>);
}