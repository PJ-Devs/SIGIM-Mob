import Sell from "../../components/screens/Sell";
import AuthorizationMiddleware from "../../middlewares/AuthorizationMiddleware";

export default function sell(): JSX.Element {
  return (
    <AuthorizationMiddleware
      authorizedRoles={[
        "Dueño de Empresa",
        "Co-Administrador",
        "Administrador de Inventario",
        "Gestor de Ventas",
      ]}
    >
      <Sell />
    </AuthorizationMiddleware>
  );
}
