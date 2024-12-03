import { View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { Category } from "../../types/products";
import { useForm } from "react-hook-form";

interface CategoryFormProps {
  actionTitle: string;
  control: any;
  errors: any;
  trigger: any;
  onSubmit: (data: any) => void;
  initialValues?: Category | null;
}

export default function CategoryForm({
  actionTitle,
  control,
  errors,
  trigger,
  onSubmit,
  initialValues = null,
}: CategoryFormProps): JSX.Element {

  return (
    <View className="mt-3" style={{ gap: 20 }}>
      <CustomInput
        label="Nombre"
        control={control}
        initialValue={initialValues ? (initialValues as Category).name : ""}
        placeholder="Nombre de la categoria"
        errors={errors}
        trigger={trigger}
        propertyName="name"
      />
      <CustomInput
        label="Descripcion"
        control={control}
        initialValue={
          initialValues ? (initialValues as Category).description : ""
        }
        placeholder="Descripcion de la categoria"
        numberOfLines={2}
        errors={errors}
        trigger={trigger}
        propertyName="description"
      />
      <CustomButton
        title={actionTitle}
        type="secondary"
        icon="tags"
        iconSize={20}
        onPress={onSubmit}
      />
    </View>
  );
}
