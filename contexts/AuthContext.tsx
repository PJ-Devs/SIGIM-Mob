import { createContext, useContext, useEffect, useState } from "react";
import * as Device from 'expo-device';
import { apiRegisterEnterprise, apiLogin, apiLogOut } from "../lib/api/api.auth";
import { deleteSecuredItem, getSecuredItem, setSecuredItem } from "../utils/secureStore";


interface AuthContextData {
  authState?: boolean | null,
  onRegister?: (enterpriseData: any) => Promise<any>,
  onLogin?: (credentials: { email: string, password: string }) => Promise<any>,
  onLogout?: () => Promise<any>,
}

const AuthContext = createContext<AuthContextData>({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthState = async () => {
      const accessToken = await getSecuredItem("ACCESS_TOKEN");
      if (accessToken) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    }
    
    checkAuthState();
  }, [])

  const register = async (enterpriseData: any) => {
    try {
      const formattedData = {
        ... enterpriseData,
        device_name: Device.deviceName ?? "Other",
      }
      const res = await apiRegisterEnterprise(formattedData);
      await setSecuredItem("ACCESS_TOKEN", res.access_token);
      setAuthState(true);
    } catch (error) {
      return { err: error, message: "Error en el registro" };
    }
  }

  const login = async (credentials: { email: string, password: string }) => {
    try {
      const formattedData = {
        ...credentials,
        device_name: Device.deviceName ?? "Other",
      }
      const res = await apiLogin(formattedData);
      await setSecuredItem("ACCESS_TOKEN", res.access_token);
      setAuthState(true);
    } catch (error) {
      return { err: error, message: "Error en el login" };
    }
  }

  const logOut = async () => {
    try {
      await apiLogOut({ device_name: Device.deviceName ?? "Other" });
      await deleteSecuredItem("ACCESS_TOKEN");
      setAuthState(false);
    } catch (error) {
      return { err: error, message: "Error en el logout" };
    }
  }

  const value = {
    authState: authState,
    onRegister: register,
    onLogin: login,
    onLogout: logOut, 
  };  

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}