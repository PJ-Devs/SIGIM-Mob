import CategoriesList from "../../../components/screens/CategoriesList";
import AuthorizationMiddleware from "../../../middlewares/AuthorizationMiddleware";

export default function categories(): JSX.Element {
  return (
    <AuthorizationMiddleware authorizedRoles={[
      'Dueño de Empresa',
      'Co-Administrador',
      'Administrador de Inventario'
    ]}>
      <CategoriesList />
    </AuthorizationMiddleware>
  );
}
