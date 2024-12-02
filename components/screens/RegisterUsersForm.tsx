import {
    Text,
    View,
  } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import { useForm } from "react-hook-form";
import DropdownComponent from "../molecules/DropDown";
import { getRoles } from "../../lib/api/api.roles";
import { EmployeeSchema } from "../../lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { EnterpriseCollaborator } from "../../types/products";

interface RegisterUsersFormProps {
  sendCollaborator: (collaborator: any) => void;
  actionTitle?: string;
  initialValues?: EnterpriseCollaborator | null;
}

export default function RegisterUsersForm(
  { sendCollaborator, actionTitle, initialValues= null }: RegisterUsersFormProps
): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectionMisses, setSelectionMisses] = useState({
    role: false,
  });

  type FormFields = z.infer<typeof EmployeeSchema>;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(EmployeeSchema),
  });

  const loadRoles = async () => {
    try {
      await getRoles()
        .then((response) => {
          setRoles(response);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const evalSelections = () => {
    if (selectedRole === null) {
      console.log("No role selected");
      setSelectionMisses({
        ...selectionMisses,
        role: true,
      });
      return false; 
    }
    return true; 
  };
  
  const handleRegister = async (data: any) => {
    if (!evalSelections()) {
      setLoading(false); 
      return;
    }
  
    setLoading(true);
    let collaborator = {
      ...data,
      role: selectedRole,
    };
  
    try {
      sendCollaborator(collaborator);
      console.log("Collaborator sent successfully!");
    } catch (error) {
      console.error("Error sending collaborator:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    loadRoles();
    console.log("Initial values", initialValues);
  }, []);

  return (
      <View className="mt-3" style={{ gap: 20 }}>
            <View className="py-2" style={{ gap: 15 }}>
              <CustomInput
                propertyName="name"
                placeholder="Nombre"
                initialValue={initialValues ? (initialValues as EnterpriseCollaborator).name : ""}
                control={control}
                errors={errors}
              />
              <CustomInput
                placeholder="Correo"
                initialValue={initialValues ? (initialValues as EnterpriseCollaborator).name : ""}
                propertyName="email"
                control={control}
                errors={errors}
                trigger={trigger}
              />
            <DropdownComponent
                data={
                  roles.map((role) => ({
                    label: role.name,
                    value: role.id,
                  })) as any
                }
                label="Rol *"
                icon="tags"
                placeholder="Selecciona un rol"
                emitValue={(value) => setSelectedRole(value)}
                error={selectionMisses.role}
                errorMessage="Debes seleccionar un rol"
                initialValue={initialValues ? {label: initialValues.role.name,
                  value: initialValues?.role?.name?.toString(),} : undefined}
              />
            </View>
        <CustomButton
          type="primary"
          title={actionTitle}
          loading={loading}
          onPress={ () =>{
            evalSelections();
            handleSubmit(handleRegister)();
          }
          }
        />
      </View>
  );
}
