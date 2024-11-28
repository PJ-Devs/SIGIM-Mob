import { useForm } from "react-hook-form";
import { STATES } from "../../utils/consts";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";
import DropdownComponent from "./DropDown";
import { useState } from "react";
import { View } from "react-native";
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

  type fromFileds = z.infer<typeof updateStockSchema>;
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<fromFileds>(
    {
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      resolver: zodResolver(updateStockSchema),
    }
  );

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
      if (selectedAction === "" && (product.stock - data['quantity']) < 0) {
        showNotification("error", "No se puede actualizar el stock");
        setLoading(false);
        return;
      }

      const body = selectedAction && selectedAction === 'added_stock'
        ? { added_stock: data['quantity'] } 
        : { added_stock: data['quantity'] } 
        
      await updateProduct(product.id.toString(), body)
        .then((response) => {
          if (response) {
            selectedAction && selectedAction === 'added_stock'
              ? product.stock += data['quantity']
              : product.stock -= data['quantity']
            emitChanges(product);
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
        <DropdownComponent
          data={STATES.stockActions}
          emitValue={(value) => setSelectedAction(value)}
          icon="exchange-alt"
        />
        <View>
          <CustomInput
            propertyName="quantity"
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
