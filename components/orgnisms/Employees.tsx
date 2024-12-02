import React, { useState } from "react";
import { FlatList, View, Text } from "react-native";
import Layout from "../orgnisms/Layout";
import { EnterpriseCollaborator } from "../../types/products";
import Loading from "../molecules/Loading";
import EmployeeCard from "../molecules/EmployeeCard";
import CustomModal from "../molecules/CustomModal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import BackButton from "../atoms/BackButton";
import RegisterUsersForm from "../screens/RegisterUsersForm";
import { EmployeeSchema } from "../../lib/schemas/auth";
import { addCollaborators, getCollaborators, getEnterprise, getProfile } from "../../lib/api/api.fetch";
import { showNotification } from "../../lib/toast/toastify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../atoms/CustomButton";
import { router } from "expo-router";

interface EmployeesProps {
    defaultEmployees?: EnterpriseCollaborator[];
    viewType: string;
}

export default function Employees({ defaultEmployees = [], viewType="register" }: EmployeesProps): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [employees, setEmployees] = useState<EnterpriseCollaborator[]>(defaultEmployees) || [];
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
    const [createModal, setCreateModal] = useState<boolean>(false);

    type FormFields = z.infer<typeof EmployeeSchema>;
    const {
        control,
        handleSubmit,
        reset,
        trigger,
        formState: { errors },
    } = useForm<FormFields>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: zodResolver(EmployeeSchema),
    });


    const addCollaborator = async (data: any) => {
        let employee = {
            name: data.name,
            email: data.email,
            role: data.role,
        }
        setEmployees([...employees, employee]);
        setCreateModal(false);
    };

    const fetchEnterpriseInfo = async () => {
        try {
            const enterpriseData = await getEnterprise();
            await AsyncStorage.setItem("enterprise", JSON.stringify(enterpriseData));
            console.log("Enterprise", enterpriseData);
        } catch (error) {
            console.error("Failed to fetch enterprise name:", error);
        }
    };

    const fetchProfile = async () => {
        try {
            const profileData = await getProfile();
            await AsyncStorage.setItem("profile", JSON.stringify(profileData));
            console.log("Profile", profileData);
        } catch (error) {
            console.log("Error fetching user profile", error);
        }
    };

    const handleCreateEmployees = async () => {
        if (employees.length === 0) {
            await fetchEnterpriseInfo();
            await fetchProfile();
            router.push("/");
            return;
        }
        try {
            let colaborators = [
                ...employees
            ];
            setLoading(true);
            await fetchEnterpriseInfo();
            await fetchProfile();
            const enterprise = await AsyncStorage.getItem("enterprise") || "";
            const response = await addCollaborators({
                colaborators,
                enterprise: JSON.parse(enterprise).id
            })
            if (response) {
                showNotification("success", "Empleados añadidos exitosamente");
                router.push("/");
            }
            setLoading(false);

        } catch (error) {
            console.error("Failed add collaborators:", error);
        }
    };

    const createCollaborator = async (data: any) => {
        try{
            let colaborators = [{
                name: data.name,
                email: data.email,
                role: data.role,}
            ];
            await fetchEnterpriseInfo();
            const enterprise = await AsyncStorage.getItem("enterprise") || "";
            if (enterprise != null) {

                setLoading(true);
                const response = await addCollaborators({
                    colaborators, enterprise: JSON.parse(enterprise).id
                })
               
                if (response) {
                    console.log("lo hizooooo");
                    setCreateModal(false);
                    const fetchedEmployees = await getCollaborators();
                    setEmployees(fetchedEmployees);
                    console.log("Collaborators added:", employees);
                    showNotification("success", "Empleado añadido exitosamente");
                }
                setLoading(false);}
        } catch(error){
            console.error("Failed to add collaborator:", error);
        }
    }

    const handleUpdateSupplier = async (employee: any) => {
        employees.map((collaborator) => {
            if (collaborator.email === employee) {
                collaborator = employee;
            }
        });
    };

    const handleDeleteSupplier = async (employeeEmail: any) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee.email !== employeeEmail)
        );
    };

    const handleActionUpdate = async () => {
        setSelectedEmployee(null);
    };

    return (
        <Layout leftButton={<BackButton />} >
            {loading ?? <Loading />}
            <Text className="text-xl font-bold text-gray-800 align-center m-2">Añade miembros a tu equipo</Text>
            <View className="flex-1 bg-white">
                <FlatList
                    data={employees}
                    keyExtractor={(item) => item.email!.toString()}
                    renderItem={({ item }) => (
                        <EmployeeCard
                            employee={item}
                            onPress={() =>
                                setSelectedEmployee((prev) =>
                                    prev === item.id ? null : item.id
                                )
                            }
                            onAction={handleActionUpdate}
                            onUpdate={handleUpdateSupplier}
                            onDelete={handleDeleteSupplier}
                        />
                    )}
                    ListFooterComponent={() => <CustomButton
                        onPress={() => setCreateModal(true)}
                        title="Añadir empleado"
                        type="secondary"
                        icon="plus"
                        iconSize={16}
                        loading={loading}
                    />}
                />

                <CustomModal
                    title="Añadir empleado"
                    visible={createModal}
                    onClose={() => {
                        setCreateModal(false);
                        reset();
                    }}
                >
                    <RegisterUsersForm
                        sendCollaborator={viewType === "register" ? addCollaborator : createCollaborator}
                        actionTitle="Añadir"
                    ></RegisterUsersForm>
                </CustomModal>
            </View>
            {
                viewType === "register" ? (
                    <View className="flex-row justify-around align-center pb-7">
                <CustomButton
                    type="primary"
                    title="Saltar"
                    onPress={handleCreateEmployees}
                >
                </CustomButton>
                <CustomButton
                    type="primary"
                    title="Finalizar"
                    onPress={handleCreateEmployees}
                >
                </CustomButton>
            </View>
                ):null
            }
        </Layout>
    );
}
