import { Text, View } from "react-native";
import Layout from "../orgnisms/Layout";
import { useForm } from "react-hook-form";
import CustomInput from "../atoms/CustomInput";

export default function CreateProduct(): JSX.Element {
  const { control } = useForm();

  return (
    <Layout canGoBack={false}>
      <View className="items-center w-full" style={{ gap: 20 }}>
        <View className="w-full">
          <Text className="text-lg pl-1.5 text-left font-semibold">
            Información del producto
          </Text>
          <View className="h-[1px] bg-black w-full mb-6" />
          <View style={{ gap: 15 }}>
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
          </View>
        </View>
        <View></View>
      </View>
    </Layout>
  );
}
