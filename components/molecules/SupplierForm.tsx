import { View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { Supplier } from "../../types/products";
import { useForm } from "react-hook-form";

interface SupplierFormProps {
  actionTitle: string;
  control: any;
  errors: any;
  trigger: any;
  onSubmit: (data: any) => void;
  initialValues?: Supplier | null;
}

export default function SupplierForm({
  actionTitle,
  control,
  errors,
  trigger,
  onSubmit,
  initialValues = null,
}: SupplierFormProps): JSX.Element {

  return (
    <View className="mt-3" style={{ gap: 20 }}>
      <CustomInput
        label="Nombre"
        control={control}
        initialValue={initialValues ? (initialValues as Supplier).name : ""}
        placeholder="Nombre"
        errors={errors}
        trigger={trigger}
        propertyName="name"
      />
      <CustomInput
        label="Correo"
        control={control}
        initialValue={
          initialValues ? (initialValues as Supplier).email : ""
        }
        placeholder="Correo"
        errors={errors}
        trigger={trigger}
        propertyName="email"
      />
            <CustomInput
        label="Numero de telefono"
        control={control}
        initialValue={
          initialValues ? (initialValues as Supplier).email : ""
        }
        placeholder="Numero de telefono"
        errors={errors}
        trigger={trigger}
        propertyName="phone_number"
      />
            <CustomInput
        label="NIT  "
        control={control}
        initialValue={
          initialValues ? (initialValues as Supplier).email : ""
        }
        placeholder="NIT"
        errors={errors}
        trigger={trigger}
        propertyName="NIT"
      />
      <CustomButton
        title={actionTitle}
        type="secondary"
        icon="save"
        iconSize={20}
        onPress={onSubmit}
      />
    </View>
  );
}
