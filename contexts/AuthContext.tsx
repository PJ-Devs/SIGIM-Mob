import { createContext, useContext, useEffect, useState } from "react";
import * as Device from 'expo-device';
import { apiRegisterEnterprise, apiLogin, apiLogOut } from "../lib/api/api.auth";
import { deleteSecuredItem, getSecuredItem, setSecuredItem } from "../utils/secureStore";
import { router } from "expo-router";


interface AuthContextData {
  authState: boolean,
  isLoading: boolean,
  onRegister: (enterpriseData: any) => Promise<any>,
  onLogin: (credentials: { email: string, password: string }) => Promise<any>,
  onLogout: () => Promise<any>,
}

const AuthContext = createContext<AuthContextData | null>(null);

export const useAuth = () => {
  const context =  useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthState = async () => {
      setIsLoading(true);
      const token = await getSecuredItem("ACCESS_TOKEN");
      if (token) {
        setAuthState(true);
      router.replace("/home");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      router.replace("/login");
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
      console.log("Error", error);
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
    isLoading: isLoading,
    onRegister: register,
    onLogin: login,
    onLogout: logOut, 
  };  

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
