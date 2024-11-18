import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Layout from "../orgnisms/Layout";
import { getCategories } from "../../lib/api/api.categories";
import { Category } from "../../types/products";
import Loading from "../molecules/Loading";
import FloatingButton from "../atoms/FloatingButton";
import CategoryCard from "../atoms/CategoryCrad";
import SearchBar from "../atoms/SearchBar";
import CustomModal from "../molecules/CustomModal";
import CategoryForm from "../molecules/CategoryForm";
import { useForm } from "react-hook-form";

export default function CategoriesList(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [modalState, setModalState] = useState<{ isVisible: boolean, isUpdate: boolean, category: Category | null }>({
    isVisible: false,
    isUpdate: false,
    category: null,
  });

  const { control, handleSubmit, reset } = useForm();

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
    if (modalState.isUpdate && modalState.category) {
      // await updateCategory(modalState.category.id, data);
    } else {
      // Create category
      // await createCategory(data);
    }
    setModalState({ ...modalState, isVisible: false });
    reset();
    fetchCategories();
  };

  // const handleDeleteCategory = async (id: number) => {
  //   await deleteCategory(id);
  //   fetchCategories();
  // };

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
                onEdit={() => setModalState({ isVisible: true, isUpdate: true, category: item })}
                onDelete={() => {}}
                isActive={item.id === selectedCategory}
              />
            )}
            ListHeaderComponent={() => <View className="h-3" />}
            ListFooterComponent={() => <View className="h-20" />}
          />
          <FloatingButton
            onPress={() => setModalState({ isVisible: true, isUpdate: false, category: null })}
            loading={loading}
          />
          <CustomModal
            title={modalState.isUpdate ? "Actualizar categoria" : "Crear nueva categoria"}
            visible={modalState.isVisible}
            onClose={() => setModalState({ ...modalState, isVisible: false })}
          >
            <CategoryForm
              actionTitle={modalState.isUpdate ? "Actualizar categoria" : "Crear categoria"}
              control={control}
              onSubmit={handleSubmit(handleCategoryAction)}
              initialValues={modalState.category || {}}
            />
          </CustomModal>
        </View>
      )}
    </Layout>
  );
}
