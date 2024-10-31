import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";

interface RegisterOwnerFormProps {
  control: any;
  trigger: any;
  onRegister: () => void;
  onBack: () => void;
  errors: any;
}

export default function RegisterOwnerForm({
  control,
  onRegister,
  trigger,
  onBack,
  errors
}: RegisterOwnerFormProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    onRegister();
    setLoading(false);
  };

  return (
      <View className="h-screen justify-center relative bottom-10">
            <Text className="text-center text-xl font-semibold">
              Añade tus datos como dueño de la empresa
            </Text>
            <View className="py-5" style={{ gap: 15 }}>
              <CustomInput
                propertyName="owner_name"
                placeholder="Nombre"
                control={control}
               errors={errors}
              />
              <CustomInput
                placeholder="email"
                propertyName="owner_email"
                control={control}
                errors={errors}
                trigger={trigger}
              />
              <CustomInput
                placeholder="Contraseña"
                propertyName="owner_password"
                secureTextEntry={true}
                control={control}
                errors={errors}
                trigger={trigger}
              />
              {/* <CustomInput
                placeholder="Contraseña"
                propertyName="owner_password"
                secureTextEntry={true}
                control={control}
                errors={errors}
                trigger={trigger}
              /> */}
            </View>
        <CustomButton
          type="primary"
          title="Registrarme"
          loading={loading}
          onPress={handleRegister}
        />
      </View>
  );
}
