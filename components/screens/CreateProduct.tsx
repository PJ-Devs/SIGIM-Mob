import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Layout from "../orgnisms/Layout";
import { useForm } from "react-hook-form";
import CustomInput from "../atoms/CustomInput";
import DropdownComponent from "../molecules/DropDown";
import InputFile from "../molecules/InputFile";
import CustomButton from "../atoms/CustomButton";
import CollapseComponent from "../molecules/Collapse";
import { useEffect, useState } from "react";
import { Category } from "../../types/products";
import { getCategories } from "../../lib/api/api.categories";
import Loading from "../molecules/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createProductSchema } from "../../lib/schemas/products";
import { createProduct } from "../../lib/api/api.products";
import { showNotification } from "../../lib/toast/toastify";

export default function CreateProduct(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectionMisses, setSelectionMisses] = useState({
    category: false,
  });

  type FormFields = z.infer<typeof createProductSchema>;
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(createProductSchema),
  });

  const loadCategories = async () => {
    try {
      await getCategories()
        .then((response) => {
          setCategories(response);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const evalSelections = () => {
    if (selectedCategory === null) {
      console.log("No category selected");
      setSelectionMisses({
        ...selectionMisses,
        category: true,
      });
    }
  };

  const handleCreateProduct = async (data: any) => {
    try {
      setLoading(true);
      await createProduct({
        ...data,
        discount: data.discount / 100,
        category_id: selectedCategory,
        supplier_id: 1,
      }).then((response) => {
        console.log("Product created:", response);
        if(response) {
          showNotification("success", "Producto creado correctamente");
          reset();
        }
      }).finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout canGoBack={false}>
      {loading && <Loading />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="min-h-screen">
            <CollapseComponent
              title="Información del producto"
              collapsed={true}
            >
              <View style={{ gap: 20 }}>
                <CustomInput
                  label="Nombre del producto *"
                  placeholder="Selecciona un nombre para el producto"
                  propertyName="name"
                  control={control}
                  trigger={trigger}
                  errors={errors}
                />
                <CustomInput
                  label="Descripción del producto *"
                  placeholder="Agrega una descripción para el producto"
                  propertyName="description"
                  numberOfLines={2}
                  control={control}
                  trigger={trigger}
                  errors={errors}
                />
                <View className="mb-2" style={{ gap: 12 }}>
                  <Text className="font-semibold">Imagen del producto</Text>
                  <View style={{ gap: 10 }}>
                    <InputFile />
                    <CustomButton
                      title="Tomar foto"
                      type="secondary"
                      icon="camera"
                      iconSize={20}
                      onPress={() => {}}
                    />
                  </View>
                </View>
                <DropdownComponent
                  data={
                    categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    })) as any
                  }
                  label="Categoria *"
                  icon="tags"
                  placeholder="Seleccione la categoria"
                  emitValue={(value) => setSelectedCategory(value)}
                  error={selectionMisses.category}
                  errorMessage="Debes seleccionar una categoria"
                />
                <View
                  className="flex-row w-[48%]"
                  style={{
                    gap: "8%",
                  }}
                >
                  <CustomInput
                    label="Precio proveedor *"
                    placeholder="Precio de proveedor"
                    propertyName="supplier_price"
                    control={control}
                    trigger={trigger}
                    errors={errors}
                  />
                  <CustomInput
                    label="Precio venta *"
                    placeholder="Precio de venta"
                    propertyName="sale_price"
                    control={control}
                    trigger={trigger}
                    errors={errors}
                  />
                </View>
                <CustomInput
                  label="Descuento *"
                  placeholder="Descuento del producto"
                  propertyName="discount"
                  initialValue="0"
                  control={control}
                  trigger={trigger}
                  errors={errors}
                />
              </View>
            </CollapseComponent>
            <View className="h-4" />
            <CollapseComponent title="Configuracion de Stock" collapsed={true}>
              <View style={{ gap: 20 }}>
                <CustomInput
                  label="Stock inicial *"
                  placeholder="Cantidad de productos"
                  propertyName="stock"
                  control={control}
                  trigger={trigger}
                  errors={errors}
                />
                <CustomInput
                  label="Stock minimo seguro *"
                  placeholder="Cantidad minima de productos"
                  propertyName="minimal_safe_stock"
                  control={control}
                  trigger={trigger}
                  errors={errors}
                />
              </View>
            </CollapseComponent>
          </View>
        </ScrollView>
        <View className="absolute bottom-0 w-full pb-2 bg-white">
          <CustomButton
            title="Crear producto"
            type="primary"
            icon="plus"
            iconSize={20}
            onPress={() => {
              evalSelections();
              handleSubmit(handleCreateProduct)();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}
