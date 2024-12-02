import Profile from "../../../components/screens/Profile";
import AuthorizationMiddleware from "../../../middlewares/AuthorizationMiddleware";

export default function profile(): JSX.Element {
  return (
    <AuthorizationMiddleware
      authorizedRoles={[
        "Dueño de Empresa",
        "Co-Administrador",
        "Administrador de Inventario",
        "Gestor de Ventas",
        "Empleado Base"
      ]}
    >
      <Profile />
    </AuthorizationMiddleware>
  );
}
