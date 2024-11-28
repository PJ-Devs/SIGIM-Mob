import { View } from "react-native";
import Header from "../molecules/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import { SIZES } from "../../utils/consts";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LayoutProps {
  includeHeader?: boolean;
  leftButton?: JSX.Element | null;
  rightButton?: JSX.Element | null;
  children: React.ReactNode;
}

export default function Layout({
  includeHeader = true,
  leftButton = null,
  rightButton = null,
  children,
}: LayoutProps) {
  const [enterprise, setEnterprise] = useState<string>("");

  useEffect(() => {
    const getEnterpriseInfo = async () => {
      try {
        const enterpriseData = await AsyncStorage.getItem("enterprise");

        if (enterpriseData !== null) {
          const enterprise = JSON.parse(enterpriseData);
          setEnterprise(enterprise.name);
          return;
        }

        setEnterprise("");
      } catch (error) {
        console.error("Failed to retrieve enterprise data:", error);
        return null;
      }
    };
    getEnterpriseInfo();
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 px-5`}
      style={{
        width: SIZES.width,
        minHeight: SIZES.height,
      }}
    >
      {includeHeader && (
        <Header
          enterpriseName={enterprise}
          leftButton={leftButton}
          rightButton={rightButton}
        />
      )}
      {children}
    </SafeAreaView>
  );
}
