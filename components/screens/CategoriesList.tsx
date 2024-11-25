import React, { useEffect, useState } from "react";
import { FlatList, View, LayoutAnimation } from "react-native";
import Layout from "../orgnisms/Layout";
import { createCategory, getCategories } from "../../lib/api/api.categories";
import { Category } from "../../types/products";
import Loading from "../molecules/Loading";
import FloatingButton from "../atoms/FloatingButton";
import CategoryCard from "../orgnisms/CategoryCard";
import SearchBar from "../atoms/SearchBar";
import DropDownFilter from "../molecules/DropDownFilter";
import { STATES } from "../../utils/consts";
import CustomModal from "../molecules/CustomModal";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { categorySchema } from "../../lib/schemas/products";
import { useForm } from "react-hook-form";
import CategoryForm from "../molecules/CategoryForm";

export default function CategoriesList(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
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

  const fetchCategories = async (status?: string) => {
    try {
      setLoading(true);
      let query = `?search=${filters.search}`;
      status ? (query += `&status=${status}`) : query += `&status=${filters.status}`;
      await getCategories(query)
        .then((response) => {
          setCategories(response);
          setSelectedCategory(null);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCreateCategory = async (data: any) => {
    try {
      setLoading(true);
      await createCategory(data)
        .then(() => {
          setCreateModal(false);
          handleActionUpdate();
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleActionUpdate = async () => {
    setSelectedCategory(null);
    fetchCategories();
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [categories]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout canGoBack={false}>
      {loading ?? <Loading />}
      <View className="flex-1 bg-white">
        <SearchBar
          onSearch={fetchCategories}
          emitSearch={(query) => setFilters({ ...filters, search: query })}
        />
        <View className="pb-1 pt-4">
          <DropDownFilter
            data={STATES.categoriesStatus}
            onSearch={(value) => fetchCategories(value)}
            setFilter={(value) => setFilters({ ...filters, status: value })}
            icon="tags"
          />
        </View>
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
              onAction={handleActionUpdate}
              isActive={item.id === selectedCategory}
            />
          )}
          ListFooterComponent={() => <View className="h-20" />}
        />
        <FloatingButton
          onPress={() => setCreateModal(true)}
          loading={loading}
        />
        <CustomModal
          title="Crear categoria"
          visible={createModal}
          onClose={() => {
            setCreateModal(false);
            reset();
          }}
        >
          <CategoryForm
            actionTitle="Crear categoria"
            control={control}
            errors={errors}
            trigger={trigger}
            onSubmit={handleSubmit(handleCreateCategory)}
          />
        </CustomModal>
      </View>
    </Layout>
  );
}
