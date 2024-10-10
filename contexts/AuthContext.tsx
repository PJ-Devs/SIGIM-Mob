import { createContext, useContext, useEffect, useState } from "react";
import * as Device from 'expo-device';
import { apiRegisterEnterprise, apiLogin, apiLogOut } from "../lib/api/api.auth";
import { deleteSecuredItem, getSecuredItem, setSecuredItem } from "../utils/secureStore";
import { router } from "expo-router";


interface AuthContextData {
  authState: boolean,
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
  const [authState, setAuthState] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthState = async () => {
      const accessToken = await getSecuredItem("ACCESS_TOKEN");
      if (accessToken) {
        router.replace("/index");
        setAuthState(true);
      } else {
        setAuthState(false);
        router.replace("/login");
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
      return error
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