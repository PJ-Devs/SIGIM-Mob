import React, { useEffect, useState } from "react";
import Employees from "../components/orgnisms/Employees";
import { EnterpriseCollaborator } from "../types/products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCollaborators } from "../lib/api/api.fetch"; 
import Loading from "../components/molecules/Loading";

export default function EmployeesContainer(): JSX.Element {
  const [employees, setEmployees] = useState<EnterpriseCollaborator[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewType, setViewType] = useState<string>("register");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const isSigningIn = await AsyncStorage.getItem("isSigningIn") || "false";
        
        if (!JSON.parse(isSigningIn)) {
          const fetchedEmployees = await getCollaborators();
          setEmployees(fetchedEmployees);
          setViewType("add");
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Employees defaultEmployees={employees || []} viewType={viewType} />;
}
