import { useEffect, useState } from "react";
import { View } from "react-native";
import Loading from "../components/molecules/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/products";
import { router } from "expo-router";
import { showNotification } from "../lib/toast/toastify";

interface AuthorizationMiddlewareProps {
  authorizedRoles: string[];
  children: JSX.Element;
}

export default function AuthorizationMiddleware({
  authorizedRoles,
  children,
}: AuthorizationMiddlewareProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);

  const isAuthorized = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem("profile");

      if (userData) {
        const user: User = JSON.parse(userData);
        if (user && user.role && authorizedRoles.includes(user.role.name)) {
          setAuthorized(true);
        } else {
          showNotification(
            "error",
            "Uups! No deberías estar aquí.",
            "No tienes permisos para acceder a esta página."
          );
          router.back();
        }
      }
    } catch (error) {
      console.error("Failed to retrieve enterprise data: ", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAuthorized();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <View>{authorized ? children : <View />}</View>;
}
