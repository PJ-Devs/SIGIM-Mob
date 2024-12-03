import { Text, View } from "react-native";
import { SIZES } from "../../utils/consts";
import Icon from "react-native-vector-icons/FontAwesome5";
import CustomInput from "../atoms/CustomInput";
import InputFile from "../molecules/InputFile";
import CustomButton from "../atoms/CustomButton";
import DropdownComponent from "../molecules/DropDown";
import { useState } from "react";
import { Category, Product } from "../../types/products";
import { useForm } from "react-hook-form";
import { productSchema } from "../../lib/schemas/products";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct } from "../../lib/api/api.products";
import { showNotification } from "../../lib/toast/toastify";

interface UpdateProductFormProps {
  product: Product;
  categories: Category[];
  emitChanges: (product: Product) => void;
}

export default function UpdateProductForm({
  product,
  categories,
  emitChanges,
}: UpdateProductFormProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    product.category.id.toString()
  );

  type fromFields = z.infer<typeof productSchema>;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isDirty },
  } = useForm<fromFields>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(productSchema),
  });

  const canUpdate = (): boolean => {
    return (
      isDirty ||
      Object.keys(errors).length > 0 ||
      selectedCategory !== product.category.id.toString()
    );
  };

  const update = (data: any) => {
    try {
      setLoading(true);
      updateProduct(product.id.toString(), {
        ...data,
        discount: data.discount / 100,
        category_id: selectedCategory,
        supplier_id: 1,
      })
        .then((response) => {
          if (response) {
            showNotification("success", "Producto actualizado correctamente");
            emitChanges(response);
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Failed to update product:", error);
      showNotification("error", "No se pudo actualizar el producto");
    }
  };

  return (
    <View
      style={{
        minHeight: SIZES.height * 0.82,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          gap: 20,
        }}
      >
        <View
          className="flex-row items-center pb-1 border-b-[1px]"
          style={{ gap: 5 }}
        >
          <Icon name="edit" size={22} />
          <Text className="text-base font-semibold">Actualizar producto</Text>
        </View>
        <View style={{ gap: 15 }}>
          <CustomInput
            label="Nombre del producto"
            placeholder="Selecciona un nombre para el producto"
            propertyName="name"
            control={control}
            initialValue={product?.name}
            trigger={trigger}
            errors={errors}
          />
          <CustomInput
            label="Descripción del producto"
            placeholder="Agrega una descripción para el producto"
            propertyName="description"
            numberOfLines={2}
            control={control}
            initialValue={product?.description}
            trigger={trigger}
            errors={errors}
          />
          <DropdownComponent
            initialValue={{
              label: product.category.name,
              value: product.category.id,
            } as any}
            data={
              categories.map((category) => ({
                label: category.name,
                value: category.id,
              })) as any
            }
            searchable={false}
            label="Categoria"
            icon="tags"
            placeholder="Seleccione la categoria"
            emitValue={(value) => setSelectedCategory(value)}
          />
          <View
            className="flex-row w-[48%]"
            style={{
              gap: "8%",
            }}
          >
            <CustomInput
              label="Precio proveedor"
              placeholder="Precio de proveedor"
              propertyName="supplier_price"
              initialValue={product?.supplier_price.toString()}
              control={control}
              trigger={trigger}
              errors={errors}
            />
            <CustomInput
              label="Precio venta"
              placeholder="Precio de venta"
              propertyName="sale_price"
              initialValue={product?.sale_price.toString()}
              control={control}
              trigger={trigger}
              errors={errors}
            />
          </View>
          <CustomInput
            label="Descuento"
            initialValue={(product?.discount! * 100).toString()}
            type="numeric"
            propertyName="discount"
            control={control}
          />
          <View style={{ gap: 12 }}>
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
          <View style={{ gap: 12 }}>
            <Text className="font-semibold">Informacion del Stock</Text>
            <View
              className="flex-row w-[48%]"
              style={{
                gap: "8%",
              }}
            >
              <CustomInput
                label="Stock minimo seguro"
                initialValue={product?.minimal_safe_stock.toString()}
                type="numeric"
                propertyName="minimal_safe_stock"
                control={control}
              />
              <CustomInput
                label="Stock disponible"
                initialValue={product?.stock.toString()}
                type="numeric"
                propertyName="stock"
                control={control}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ gap: 2 }}>
        <CustomButton
          type="secondary"
          title="Actualizar Producto"
          disabled={!canUpdate()}
          loading={loading}
          onPress={handleSubmit(update)}
        />
        {!canUpdate() && (
          <Text className="text-center text-gray-700">
            No se han realizado cambios
          </Text>
        )}
      </View>
    </View>
  );
}
