import React, { useEffect, useState } from "react";
import { FlatList, View, LayoutAnimation } from "react-native";
import Layout from "../orgnisms/Layout";
import { createSupplier, getSuppliers } from "../../lib/api/api.suppliers";
import { Supplier } from "../../types/products";
import Loading from "../molecules/Loading";
import FloatingButton from "../atoms/FloatingButton";
import SupplierCard from "../orgnisms/SupplierCard";
import CustomModal from "../molecules/CustomModal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supplierSchema } from "../../lib/schemas/suppliers";
import { useForm } from "react-hook-form";
import SupplierForm from "../molecules/SupplierForm";
import BackButton from "../atoms/BackButton";
import ProfileButton from "../atoms/ProfileButton";

export default function Suppliers(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);

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

  const fetchSuppliers = async (status?: string) => {
    try {
      setLoading(true);
      await getSuppliers()
        .then((response) => {
          setSuppliers(response);
          setSelectedSupplier(null);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    }
  };

  const handleCreateSupplier = async (data: any) => {
    try {
      setLoading(true);
      await createSupplier(data)
        .then(() => {
          setCreateModal(false);
          handleActionUpdate();
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    }
  };

  const handleActionUpdate = async () => {
    setSelectedSupplier(null);
    fetchSuppliers();
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [suppliers]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <Layout leftButton={<BackButton />} rightButton={<ProfileButton />}>
      {loading ?? <Loading />}
      <View className="flex-1 bg-white">
        <FlatList
          data={suppliers}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <SupplierCard
              supplier={item}
              onPress={() =>
                setSelectedSupplier((prev) =>
                  prev === item.id ? null : item.id
                )
              }
              onAction={handleActionUpdate}
            />
          )}
          ListFooterComponent={() => <View className="h-20" />}
        />
        <FloatingButton
          onPress={() => setCreateModal(true)}
          loading={loading}
        />
        <CustomModal
          title="Crear proveedor"
          visible={createModal}
          onClose={() => {
            setCreateModal(false);
            reset();
          }}
        >
          <SupplierForm
            actionTitle="Crear proveedor"
            control={control}
            errors={errors}
            trigger={trigger}
            onSubmit={handleSubmit(handleCreateSupplier)}
          />
        </CustomModal>
      </View>
    </Layout>
  );
}
