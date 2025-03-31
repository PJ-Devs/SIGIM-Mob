import Main from "../../components/screens/Main";
import AuthorizationMiddleware from "../../middlewares/AuthorizationMiddleware";

export default function Index(): JSX.Element {
  return (
    <AuthorizationMiddleware
      authorizedRoles={[
        "Dueño de Empresa",
        "Co-Administrador",
        "Administrador de Inventario",
        "Gestor de Ventas",
        "Empleado Base",
      ]}
    >
      <Main />
    </AuthorizationMiddleware>
  );
}
