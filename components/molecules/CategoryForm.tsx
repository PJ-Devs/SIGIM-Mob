import { View } from "react-native";
import CustomInput from "../atoms/CustomInput";
import CustomButton from "../atoms/CustomButton";
import { Category } from "../../types/products";

interface CategoryFormProps {
  actionTitle: string;
  control: any;
  onSubmit: (data: any) => void;
  initialValues: Category | {};
}

export default function CategoryForm({
  actionTitle,
  control,
  onSubmit,
  initialValues,
}: CategoryFormProps): JSX.Element {
  return (
    <View className="mt-3" style={{ gap: 20 }}>
      <CustomInput
        label="Nombre"
        control={control}
        initialValue={initialValues ? (initialValues as Category).name : ""}
        placeholder="Nombre de la categoria"
        propertyName="name"
      />
      <CustomInput
        label="Descripcion"
        control={control}
        initialValue={initialValues ? (initialValues as Category).description : ""}
        placeholder="Descripcion de la categoria"
        numberOfLines={2}
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
