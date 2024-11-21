import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Layout from "../orgnisms/Layout";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../lib/api/api.categories";
import { Category } from "../../types/products";
import Loading from "../molecules/Loading";
import FloatingButton from "../atoms/FloatingButton";
import CategoryCard from "../atoms/CategoryCrad";
import SearchBar from "../atoms/SearchBar";
import CustomModal from "../molecules/CustomModal";
import CategoryForm from "../molecules/CategoryForm";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { categorySchema } from "../../lib/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../atoms/CustomButton";

export default function CategoriesList(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [modalState, setModalState] = useState<{
    isVisible: boolean;
    isUpdate: boolean;
    isDelete: boolean;
    category: Category | null;
  }>({
    isVisible: false,
    isUpdate: false,
    isDelete: false,
    category: null,
  });

  type FormFields = z.infer<typeof categorySchema>;
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(categorySchema),
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryAction = async (data: any) => {
    try {
      if (modalState.isUpdate && modalState.category) {
        await updateCategory(modalState.category.id.toString(), data);
      } else {
        await createCategory(data);
      }
      setModalState({ ...modalState, isVisible: false });
      reset();
      fetchCategories();
    } catch (error) {
      console.error("Failed to process category action:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      if (modalState.category && modalState.isDelete) {
        await deleteCategory(modalState.category.id.toString());
      }
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout includeSearch={true} canGoBack={false}>
      {loading ? (
        <Loading />
      ) : (
        <View className="flex-1 bg-white">
          <SearchBar onSearch={() => {}} />
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() =>
                  setSelectedCategory((prev) =>
                    prev === item.id ? null : item.id
                  )
                }
                onEdit={() =>
                  setModalState({
                    isVisible: true,
                    isUpdate: true,
                    isDelete: false,
                    category: item,
                  })
                }
                onDelete={() =>
                  setModalState({
                    isVisible: true,
                    isUpdate: false,
                    isDelete: true,
                    category: item,
                  })
                }
                isActive={item.id === selectedCategory}
              />
            )}
            ListHeaderComponent={() => <View className="h-3" />}
            ListFooterComponent={() => <View className="h-20" />}
          />
          <FloatingButton
            onPress={() =>
              setModalState({
                isVisible: true,
                isUpdate: false,
                isDelete: false,
                category: null,
              })
            }
            loading={loading}
          />
          <CustomModal
            title={
              modalState.isUpdate
                ? "Actualizar categoria"
                : "Crear nueva categoria"
            }
            visible={modalState.isVisible && !modalState.isDelete}
            onClose={() => {
              setModalState({ ...modalState, isVisible: false });
              reset();
            }}
          >
            <CategoryForm
              actionTitle={
                modalState.isUpdate ? "Actualizar categoria" : "Crear categoria"
              }
              control={control}
              errors={errors}
              trigger={trigger}
              onSubmit={handleSubmit(handleCategoryAction)}
              initialValues={modalState.category || {}}
            />
          </CustomModal>
          <CustomModal
            title="Eliminar categoria"
            visible={modalState.isDelete && modalState.isVisible}
            onClose={() => {
              setModalState({ ...modalState, isVisible: false });
            }}
          >
            <View className="w-full" style={{ gap: 15 }}>
              <Text className="text-center text-lg text-gray-800">
                ¿Estás seguro de eliminar la categoria?
              </Text>
              <View className="w-full flex-row" style={{
                gap: 8,
              }}>
                <CustomButton
                  type="success"
                  title="Estoy seguro!"
                  icon="check"
                  iconSize={20}
                  onPress={() => {
                    handleDeleteCategory();
                    setModalState({ ...modalState, isVisible: false });
                  }}
                  style="w-1/2 py-1.5"
                />
                <CustomButton
                  type="error"
                  title="Cancelar"
                  icon="times"
                  iconSize={20}
                  iconColor="white"
                  onPress={() => {
                    setModalState({ ...modalState, isVisible: false });
                  }}
                  style="w-1/2 py-1.5"
                />
              </View>
            </View>
          </CustomModal>
        </View>
      )}
    </Layout>
  );
}
