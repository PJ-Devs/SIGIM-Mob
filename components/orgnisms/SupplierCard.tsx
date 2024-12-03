import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { Supplier } from "../../types/products";
import CustomButton from "../atoms/CustomButton";
import CustomModal from "../molecules/CustomModal";
import { deleteSupplier, updateSupplier } from "../../lib/api/api.suppliers";
import SupplierForm from "../molecules/SupplierForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { supplierSchema } from "../../lib/schemas/suppliers";
import * as z from "zod";
import { useForm } from "react-hook-form";
import VerifyModal from "../molecules/VerifyModal";
import { showNotification } from "../../lib/toast/toastify";
import Loading from "../molecules/Loading";

interface SupplierCardProps {
  supplier: Supplier;
  onPress: (id: number) => void;
  onAction: () => void;
}

export default function SupplierCard({
  supplier,
  onPress,
  onAction,
}: SupplierCardProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(-10)).current;
  const [modalState, setModalState] = useState<{
    isUpdate: boolean;
    isDelete: boolean;
    isEnable: boolean;
  }>({
    isUpdate: false,
    isDelete: false,
    isEnable: false,
  });

  type FormFields = z.infer<typeof supplierSchema>;
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(supplierSchema),
  });

  const handleUpdateSupplier = async (data: any) => {
    try {
      setLoading(true);
      await updateSupplier(supplier.id.toString(), data).then((response) => {
        if (response) {
          showNotification(
            "success",
            "Proveedor actualizado",
            "El proveedor se ha actualizado correctamente correctamente"
          );
          onAction();
          setModalState({ ...modalState, isUpdate: false });
        } else {
          showNotification(
            "error",
            "Error al actualizar proveedor",
            "Ocurrio un error al actualizar el proveedor"
          );
        }
      })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to update supplier:", error);
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      setLoading(true);
      await deleteSupplier(supplier.id.toString()).then((response) => {
        if (response) {
          showNotification(
            "success",
            "Proveedor eliminado",
            "El proveedor ha sido eliminado correctamente"
          );
          onAction();
          setModalState({ ...modalState, isDelete: false });
        } else {
          showNotification(
            "error",
            "Error al eliminar proveedor",
            "Ocurrio un error al eliminar el proveedor"
          );
        }
      });
    } catch (error) {
      console.error("Failed to delete supplier:", error);
    }
  };


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
      <Pressable onPress={() => onPress(supplier.id)}>

        <View className="flex items-center" style={{ gap: 6 }}>
          <View className="p-4 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <View className="space-y-0.5">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-bold text-gray-600">{supplier.name}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-md font-semibold text-gray-600">Correo:</Text>
                <Text className="text-gray-800">{supplier.email}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-md font-semibold text-gray-600">Número de teléfono:</Text>
                <Text className="text-gray-800">{supplier.phone_number}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-md font-semibold text-gray-600">NIT:</Text>
                <Text className="text-gray-800">{supplier.NIT}</Text>
              </View>
            </View>
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
      <View className="flex-row justify-center" style={{ gap: 8 }}>
        <CustomButton
          style="flex justify-center items-center bg-orange-300 p-2 rounded-full shadow-sm"
          type="icon"
          icon="pen"
          iconColor="white"
          iconSize={16}
          onPress={() =>
            setModalState({ ...modalState, isUpdate: true })
          }
        />
        <CustomButton
          style="flex justify-center items-center bg-red-400 p-2 rounded-full shadow-sm"
          type="icon"
          iconColor="white"
          iconSize={16}
          icon="trash"
          onPress={() =>
            setModalState({ ...modalState, isDelete: true })
          }
        />
      </View>
      <CustomModal
        title={"Actualizar proveedor"}
        visible={modalState.isUpdate}
        onClose={() => {
          setModalState({ ...modalState, isUpdate: false });
          reset();
        }}
      >
        <SupplierForm
          actionTitle={"Actualizar proveedor"}
          control={control}
          errors={errors}
          trigger={trigger}
          onSubmit={handleSubmit(handleUpdateSupplier)}
          initialValues={supplier}
        />
      </CustomModal>
      <VerifyModal
        title="Eliminar proveedor"
        message="¿Estás seguro de eliminar el proveedor?"
        action={() => handleDeleteSupplier()}
        modalVisible={modalState.isDelete}
        setVisible={() => setModalState({ ...modalState, isDelete: false })}
      />
    </Animated.View>
  );
}
