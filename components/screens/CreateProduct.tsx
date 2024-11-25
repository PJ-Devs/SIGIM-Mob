import { ScrollView, Text, View } from "react-native";
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

export default function CreateProduct(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Layout canGoBack={false}>
      {loading && <Loading />}
      <ScrollView className="w-full">
        <CollapseComponent title="Información del producto" collapsed={true}>
          <View style={{ gap: 20 }}>
            <CustomInput
              label="Nombre del producto"
              placeholder="Selecciona un nombre para el producto"
              propertyName="name"
              control={control}
            />
            <CustomInput
              label="Descripción del producto"
              placeholder="Agrega una descripción para el producto"
              propertyName="description"
              numberOfLines={2}
              control={control}
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
              label="Categoria"
              icon="tags"
              placeholder="Seleccione la categoria"
            />
            {/* <DropdownComponent
              data={data}
              label="Proveedor"
              icon="truck"
              placeholder="Seleccione el proveedor"
            /> */}
            <View
              className="flex-row w-[48%]"
              style={{
                gap: "8%",
              }}
            >
              <CustomInput
                label="Precio proveedor"
                placeholder="Precio de proveedor"
                propertyName="provider-price"
                control={control}
              />
              <CustomInput
                label="Precio venta"
                placeholder="Precio de venta"
                propertyName="sale-price"
                control={control}
              />
            </View>
          </View>
        </CollapseComponent>
        <View className="h-4" />
        <CollapseComponent title="Configuracion de Stock" collapsed={false}>
          <View style={{ gap: 20 }}>
            <CustomInput
              label="Stock inicial"
              placeholder="Cantidad de productos"
              propertyName="stock"
              control={control}
            />
            <CustomInput
              label="Stock minimo seguro"
              placeholder="Cantidad minima de productos"
              propertyName="min-stock"
              control={control}
            />
          </View>
        </CollapseComponent>
      </ScrollView>
    </Layout>
  );
}
