import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { EnterpriseCollaborator } from "../../types/products";
import CustomButton from "../atoms/CustomButton";
import CustomModal from "../molecules/CustomModal";
import VerifyModal from "../molecules/VerifyModal";
import Loading from "../molecules/Loading";
import RegisterUsersForm from "../screens/RegisterUsersForm";

interface CollaboratorCardProps {
    employee: EnterpriseCollaborator;
    onPress: (id: number) => void;
    onAction: () => void;
    onUpdate: (data: any) => void;
    onDelete: (data: any) => void;
}

export default function EmployeeCard({
    employee,
    onPress,
    onUpdate,
    onDelete,
}: CollaboratorCardProps): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const buttonTranslateY = useRef(new Animated.Value(-10)).current;
    const [modalState, setModalState] = useState<{
        isUpdate: boolean;
        isDelete: boolean;
    }>({
        isUpdate: false,
        isDelete: false,
    });

    return (
        <Animated.View
            style={{
                backgroundColor: '#fff',
                borderColor: "#f0f0f0",
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 6,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            }}
        >
            {loading && <Loading />}
            <Pressable onPress={() => onPress(employee.id)}>
                <View className="p-2">
                    <View className="flex-row justify-between items-center">
                <Text className="text-md font-semibold text-gray-600">{employee.email}</Text>
                <Text className="text-gray-800">{employee.role.name}</Text>
              </View>
                    
                    <Animated.View
                        style={{
                            opacity: buttonOpacity,
                            transform: [{ translateY: buttonTranslateY }],
                        }}
                    >
                    </Animated.View>
                </View>
            </Pressable>
            <View className="flex-row" style={{ gap: 8 }}>
                <CustomButton
                    style="flex justify-center items-center bg-orange-300 p-2 rounded-full shadow-sm"
                    type="icon"
                    icon="pen"
                    iconColor="white"
                    iconSize={12}
                    onPress={() =>
                        setModalState({ ...modalState, isUpdate: true })
                    }
                />
                <CustomButton
                    style="flex justify-center items-center bg-red-400 p-2 rounded-full shadow-sm"
                    type="icon"
                    iconColor="white"
                    iconSize={12}
                    icon="trash"
                    onPress={() =>
                        setModalState({ ...modalState, isDelete: true })
                    }
                />
            </View>
            <CustomModal
                title={"Actualizar empleado"}
                visible={modalState.isUpdate}
                onClose={() => {
                    setModalState({ ...modalState, isUpdate: false });
                }}
            >
                <RegisterUsersForm
                    actionTitle="Actualizar"
                    sendCollaborator={() => {
                        setModalState({ ...modalState, isUpdate: false });
                        onUpdate(employee.email);
                    }
                    }
                    initialValues={employee}
                />
            </CustomModal>
            <VerifyModal
                title="Eliminar empleado"
                message="¿Estás seguro de que no quieres crear este empleado?"
                action={() => {
                    setModalState({ ...modalState, isDelete: false });
                    onDelete(employee.email);
                }
                }
                modalVisible={modalState.isDelete}
                setVisible={() => setModalState({ ...modalState, isDelete: false })}
            />
        </Animated.View>
    );
}
