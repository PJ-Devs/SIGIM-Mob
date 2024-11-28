import { useForm } from "react-hook-form";
import { STATES } from "../../utils/consts";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import DropdownComponent from "./DropDown";
import { useState } from "react";
import { Text, View } from "react-native";
import { Product } from "../../types/products";
import { updateProduct } from "../../lib/api/api.products";
import { showNotification } from "../../lib/toast/toastify";
import * as z from "zod";
import { updateStockSchema } from "../../lib/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateStockFromProps {
  product: Product;
  emitChanges: (product: Product) => void;
}

export default function UpdateStockForm({
  product,
  emitChanges,
}: UpdateStockFromProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [error, setError] = useState<string>("");

  type fromFileds = z.infer<typeof updateStockSchema>;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<fromFileds>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(updateStockSchema),
  });

  /**
   * Handles the update of the stock for a given product.
   *
   * @param {any} data - The data to update the product with.
   *
   * @function handleUpdateStock
   * @throws Will throw an error if the update process fails.
   */
  const handleUpdateStock = async (data: any) => {
    try {
      setLoading(true);
      if (selectedAction === "decrease" && data.stock_change > product.stock) {
        setError(
          "No puedes disminuir el stock del producto por debajo del stock actual"
        );
        setLoading(false);
        return;
      }

      await updateProduct(product.id.toString(), {
        ... data,
        added_stock: selectedAction === "add" ? true : false,
      })
        .then((response) => {
          if (response) {
            emitChanges(response);
            showNotification("success", "Stock Actualizado con exito");
          }
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log("Error updating the product", error);
      showNotification("error", "Error actualizando el producuto");
    }
  };

  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 15 }}>
        {error && (
          <View className="w-full">
            <Text className="font-semibold px-2 py-1 bg-red-200 border-l-4 border-red-600 rounded-md">
              {error}
            </Text>
          </View>
        )}
        <View>
          <DropdownComponent
            data={STATES.stockActions}
            emitValue={(value) => setSelectedAction(value)}
            icon="exchange-alt"
          />
          <View className="w-full items-end">
            {selectedAction === "decrease" && (
              <Text className="pt-0.5 font-semibold">
                Stock actual del producto: {product.stock} unidades.
              </Text>
            )}
          </View>
        </View>
        <View>
          <CustomInput
            propertyName="stock_change"
            placeholder="Selecciona una cantidad"
            label="Cantidad a actualizar"
            initialValue="0"
            type="numeric"
            control={control}
            trigger={trigger}
            errors={errors}
          />
        </View>
      </View>
      <CustomButton
        title="Actualizar Stock"
        type="secondary"
        icon="box"
        iconSize={20}
        disabled={loading || !selectedAction}
        loading={loading}
        onPress={handleSubmit(handleUpdateStock)}
      />
    </View>
  );
}
